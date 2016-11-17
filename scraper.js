'use strict';

var path = require('path');

var _ = require('lodash');
var fs = require('fs-extra');
var eos = require('end-of-stream');
var pump = require('pump');
var rest = require('rest');
var when = require('when');
var guard = require('when/guard');
var request = require('request');
var cheerio = require('cheerio');
var PouchDB = require('pouchdb');

var db = new PouchDB('databases/cards');

var sort = require('./src-server/lib/sort');

function uniqueId(card){
  return card.card_number.toLowerCase() + '_' + _.snakeCase(card.card_name.replace(/'/, ''));
}

function imagePath(card){
  console.log(path.extname(card.picture));
  var outFile = uniqueId(card) + path.extname(card.picture);
  return path.join('./images/', card.set, outFile);
}

function fetchCard(card){
  var outPath = imagePath(card);

  return when.promise(function(resolve, reject){
    pump([
      request(card.picture),
      fs.createOutputStream(outPath)
    ], function(err){
      if(err){
        console.log('error', card.picture, err);
        // reject(err);
      }

      resolve(card);
    });
  });
}

function fetchCards(cards){
  return when.map(cards, guard(guard.n(1), fetchCard));
}

function saveCard(card){
  var record = _.assign({}, _.omit(card, 'picture'), {
    _id: '' + sort(card) + '_' + uniqueId(card),
    id: uniqueId(card),
    image: '/' + imagePath(card)
  });

  console.log(record);

  return db.put(record);
}

function saveCards(cards){
  return when.map(cards, saveCard);
}

rest('http://www.panztcg.com/master_list.php')
  .entity()
  .then(function(text){

    var $ = cheerio.load(text);

    var $table = $('table#example');
    var $headers = $table.find('> thead th');
    var $rows = $table.find('> tbody tr');

    var model = {};
    var modelKeys = [];
    $headers.each(function(){
      var text = $(this).text();

      var normalizedText = text.replace('#', 'number');

      var key = _.snakeCase(normalizedText);
      modelKeys.push(key);

      model[key] = null;
    });

    var cards = [];

    $rows.each(function(){
      var $row = $(this);
      var $cells = $row.find('td');

      var card = {};

      $cells.each(function(idx){
        var key = modelKeys[idx];

        var text = $(this).text();

        var normalizedText = text.replace(/\s+$/, '').trim();

        card[key] = normalizedText;
      });

      // Picture is a special case with a data attribute
      var src = $row.attr('data-imgurl');
      card.picture = src;

      // console.log(card);
      cards.push(card);
    });

    return cards;
  })
  // .then(fetchCards)
  .then(saveCards);
