'use strict';

global.Promise = require('when/es6-shim/Promise');

var getConfig = require('hjs-webpack');

var config = getConfig({
  in: './src-client/index.js',
  out: './dist-client/',
  // isDev: true
});

module.exports = config;
