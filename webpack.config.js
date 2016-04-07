'use strict';

global.Promise = require('when/es6-shim/Promise');

var getConfig = require('hjs-webpack');

module.exports = getConfig({
  in: './src-client/index.js',
  out: './dist-client/'
});
