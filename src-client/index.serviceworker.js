'use strict';

const { precache, router, cacheFirst, options } = require('sw-toolbox');

options.debug = true;

const precacheFiles = fetch('/cards')
  .then(function(response){
    return response.json();
  })
  .then(function(cards){
    const images = cards.map(function(card){
      return card.image;
    });

    const files = ['/cards'].concat(images);

    return files;
  });

precache(precacheFiles);

router.get('/cards', cacheFirst);
router.get('/images/*', cacheFirst);
