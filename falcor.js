'use strict';

const path = require('path');
const assert = require('assert');

const { Server } = require('hapi');

const DbClient = require('./lib/db-client');

const server = new Server();

server.connection({ port: 3000 });

const db = new DbClient('databases/cards');

const falcorRoutes = [
  {
    route: 'cards.length',
    get(){
      return db.list()
        .then(function(result){
          return { path: ['cards', 'length'], value: result.length };
        });
    }
  },
  {
    route: 'cards[{integers:indices}]["card_name", "card_number"]',
    get(pathSet){
      const props = pathSet[2];

      return db.list()
        .then(function(result){

          return pathSet.indices.reduce(function(out, idx){
            const row = result[idx];
            console.log(row);

            return out.concat(props.map(function(prop){
              const res = { path: ['cards', idx, prop], value: row[prop] };
              console.log(res);
              return res;
            }));
          }, []);

        });
    }
  }
];

const plugins = [
  {
    register: require('inert')
  },
  {
    register: require('falcor-hapi')
  }
];

const routes = [
  {
    method: ['GET', 'POST'],
    path: '/model.json',
    handler: {
      falcor: {
        routes: falcorRoutes,
        cacheRoutes: false,
        options: {
          debug: true
        }
        // initialize: function() {
        //    this.foo = this.req.payload.meaningoflife || 42;
        // },
        // routerClass: MyRouterClass
      }
    }
  },
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
  // console.log(err);
  assert(!err);

  console.log('Server running on: http://localhost:3000');
}

function onRegister(err){
  // console.log(err);
  assert(!err);

  server.route(routes);

  server.start(onStart);
}

server.register(plugins, onRegister);
