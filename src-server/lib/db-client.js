'use strict';

const when = require('when');
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
PouchDB.plugin(require('pouchdb-quick-search'));
const { reach } = require('origami');

function map(mapperFn, list){
  return list.map(mapperFn);
}

function docs(item){
  const doc = item.doc;
  return doc;
}

const allDocsConfig = {
  endKey: '_design/\uffff',
  include_docs: true
};

const defaultFields = [
  'card_name',
  'ability'
];

class DbClient {
  constructor(path){
    this._db = new PouchDB(path);
  }

  list(){
    return when(this._db.allDocs(allDocsConfig))
      .fold(reach, 'rows')
      .fold(map, docs);
  }

  get(id){
    const db = this._db;
    const idx = db.createIndex({
      index: {
        fields: ['id']
      }
    });

    const query = idx
      .then(() => db.find({ selector: { id }, limit: 1 }));

    return when(query)
      .fold(reach, 'docs.0');
  }

  update(card) {
    const db = this._db;
    const query = db.put(card);
      // .catch(function(err) {
      //   if (err.name === 'conflict') {
      //     console.log(err);
      //     return db.get(card._id, { conflicts: true });
      //   } else {
      //     throw err;
      //   }
      //   // console.log(err);
      //   // throw err;
      // })
      // .tap(console.log);

    return when(query);
  }

  delete(card) {
    return when(this._db.remove(card));
  }

  search(query, fields = defaultFields){
    if(Array.isArray(fields) && !fields.length){
      fields = defaultFields;
    }

    const config = {
      query,
      fields,
      include_docs: true
    };

    return when(this._db.search(config))
      .fold(reach, 'rows')
      .fold(map, docs);
  }

}

module.exports = DbClient;
