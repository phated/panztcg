'use strict';

const rest = require('rest');
const when = require('when');
const keys = require('when/keys');
const mime = require('rest/interceptor/mime');
const { resolve } = require('react-resolver');

const client = rest
  .wrap(mime, { mime: 'application/json' });

const resolver = resolve('data', function() {
  const request = client('/cards').entity();

  return keys.all({
    active: request,
    inactive: when.map(request, ({ _id }) => ({ _id }))
  });
});

module.exports = resolver;
