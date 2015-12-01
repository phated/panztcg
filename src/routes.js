'use strict';

const path = require('path');

const routes = [
  {
    method: 'GET',
    path: '/cards',
    handler: require('./handlers/list-cards')
  },
  {
    method: 'GET',
    path: '/cards/{card_id}',
    handler: require('./handlers/get-card')
  },
  {
    method: 'GET',
    // TODO: better path? maybe part of /cards
    path: '/cards/search',
    handler: require('./handlers/search-cards')
  },
  {
    method: 'GET',
    path: '/images/{param*}',
    handler: {
      directory: {
        path: path.join(__dirname, '../images/')
      }
    }
  }
];

module.exports = routes;
