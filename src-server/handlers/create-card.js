'use strict';

const path = require('path');

const _ = require('lodash');
const { move } = require('fs-extra');

const sort = require('../lib/sort');

function uniqueId(card){
  return card.card_number.toLowerCase() + '_' + _.snakeCase(card.title.replace(/'/, ''));
}

function editCard(request, reply) {
  const { db } = request.server.app;

  const id = uniqueId(request.payload);

  const weight = sort(request.payload);
  const _id = `${weight}_${id}`;

  const card = _.merge({}, request.payload, {
    _id,
    id
  });

  const file = card.image_file;
  // console.log(request);

  move(file.path, path.join(process.cwd(), card.image), { clobber: true }, onMove);

  function onMove(err) {
    if (err) {
      console.log(err);
      reply(err);
      return;
    }

    delete card.image_file;

    console.log(card);

    // const result = {};
    const result = db.update(card);
    reply(result);
  }
}

module.exports = editCard;