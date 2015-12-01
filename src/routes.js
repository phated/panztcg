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
    path: '/images/{param*}',
    handler: {
      directory: {
        path: path.join(__dirname, '../images/')
      }
    }
  }
];

module.exports = routes;
