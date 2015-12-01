'use strict';

const assert = require('assert');

const { Server } = require('hapi');

const routes = require('./routes');
const plugins = require('./plugins');

const DbClient = require('./lib/db-client');

const server = new Server();

server.connection({ port: 3000 });

function onStart(err){
  assert(!err);

  const db = new DbClient('databases/cards');

  server.app.db = db;

  console.log('Server running on: http://localhost:3000');
}

function onRegister(err){
  assert(!err);

  server.route(routes);

  server.start(onStart);
}

server.register(plugins, onRegister);
