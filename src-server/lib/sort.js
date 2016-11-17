'use strict';

var raritySortWeight = {
  '1': 0,
  '3': 1000,
  '5': 2000,
  '6': 3000,
  '7': 4000,
  '4': 5000,
  '2': 6000
};

function sort(card) {
  var setNumber = card.set_number || +(card.set.replace('set', ''));
  var rarity = card.rarity_number || card.rarity;
  var cardNumber = +(card.card_number.replace(/\D/g, ''));

  var sortWeight = ((setNumber * 10000) + (raritySortWeight[rarity]) + cardNumber);

  return sortWeight;
}

module.exports = sort;