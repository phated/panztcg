'use strict';

const assert = require('assert');

const { Server } = require('hapi');

const routes = require('./routes');
const plugins = require('./plugins');

const DbClient = require('./lib/db-client');

const server = new Server();

server.connection({ port: process.env.PORT, routes: { cors: true } });

function onStart(err){
  assert(!err);

  const db = new DbClient('databases/cards');

  server.app.db = db;

  console.log(`Server running on: ${server.info.uri}`);
}

function onRegister(err){
  assert(!err);

  server.route(routes);

  server.start(onStart);
}

server.register(plugins, onRegister);
