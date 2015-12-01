'use strict';

function getCardHandler(request, reply){
  const { db } = request.server.app;
  const { card_id } = request.params;

  const card = db.get(card_id);

  reply(card);
}

module.exports = getCardHandler;
