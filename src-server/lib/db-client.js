'use strict';

const when = require('when');
const PouchDB = require('pouchdb');
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
  startkey: '_design0',
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
    return when(this._db.get(id));
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
