'use strict';

const _ = require('lodash');
const when = require('when');
const PouchDB = require('pouchdb');
const { reach } = require('origami');

function map(mapperFn, list){
  return list.map(mapperFn);
}

function docs(item){
  const doc = item.doc;
  return _.assign({}, doc, { image: `http://localhost:3000${doc.image}` });
}

class DbClient {
  constructor(path){
    this._db = new PouchDB(path);
  }

  _list(){
    return when(this._db.allDocs({
      startkey: '_design0',
      include_docs: true
    }));
  }

  list(){
    return this._list()
      .fold(reach, 'rows')
      .fold(map, docs);
  }

}

module.exports = DbClient;
