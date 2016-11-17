'use strict';

const _ = require('lodash');

const sort = require('../lib/sort');

function uniqueId(card){
  return card.card_number.toLowerCase() + '_' + _.snakeCase(card.title.replace(/'/, ''));
}

function editCard(request, reply) {
  const { db } = request.server.app;
  const { card_id } = request.params;

  const id = uniqueId(request.payload);

  const weight = sort(request.payload);
  const _id = `${weight}_${id}`;

  const card = _.merge({}, request.payload, {
    _id,
    id
  });

  console.log(card);

  let result;
  if (_id !== card_id) {
    const del = db.delete({ _id: card_id, _rev: card._rev });

    delete card._rev;

    result = del.then(() => db.update(card));
  } else {
    result = db.update(card);
  }

  reply(result);
}

module.exports = editCard;