'use strict';

const path = require('path');

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: require('./handlers/home')
  },
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
    path: '/search/cards',
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
