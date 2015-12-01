'use strict';

function searchCardsHandler(request, reply){
  const { db } = request.server.app;
  const { query } = request.query;

  const cards = db.search(query);

  reply(cards);
}

module.exports = searchCardsHandler;
