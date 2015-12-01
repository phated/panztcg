'use strict';

function listCardsHandler(request, reply){
  const { db } = request.server.app;

  const cards = db.list();

  reply(cards);
}

module.exports = listCardsHandler;
