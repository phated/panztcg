'use strict';

const path = require('path');
const assert = require('assert');

const { Server } = require('hapi');

const DbClient = require('./lib/db-client');

const server = new Server();

server.connection({ port: 3000 });

const db = new DbClient('databases/cards');

const plugins = [
  {
    register: require('inert')
  }
];

const routes = [
  {
    method: 'GET',
    path: '/cards',
    handler(request, reply){
      const cards = db.list();
      reply(cards);
    }
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

function onStart(err){
  assert(!err);

  console.log('Server running on: http://localhost:3000');
}

function onRegister(err){
  assert(!err);

  server.route(routes);

  server.start(onStart);
}

server.register(plugins, onRegister);
