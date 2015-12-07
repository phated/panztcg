'use strict';

const _ = require('lodash');

const commaRegExp = /,/;
const spaceRegExp = /\s+/;
const fieldsRegExp = /^in:(.*)/;

const defaultOpts = {
  query: '',
  fields: []
};

function buildQuery(query){

  const params = _.trim(query).split(spaceRegExp);

  const opts = _.reduce(params, function(result, param){
    const match = fieldsRegExp.exec(param);
    if(match){
      const fields = match[1].split(commaRegExp);
      result.fields = result.fields.concat(fields);
    } else {
      result.query = _.trim(param);
    }

    return result;
  }, _.clone(defaultOpts));

  return opts;
}

function searchCardsHandler(request, reply){
  const { db } = request.server.app;
  const { q } = request.query;

  if(!q){
    return reply({});
  }

  const opts = buildQuery(q);

  const cards = db.search(opts.query, opts.fields);

  reply(cards);
}

module.exports = searchCardsHandler;
