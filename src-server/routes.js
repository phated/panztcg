'use strict';

const path = require('path');

const joi = require('joi');

var sets = [
  'Premiere',
  'Heroes & Villains',
  'Movie Collection',
  'Evolution',
  'Perfection',
  'Vengeance',
  'Awakening'
];

var rarities = [
  'Common',
  'Uncommon',
  'Promo',
  'Starter',
  'Rare',
  'Ultra Rare',
  'Dragon Rare'
];

const routes = [
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: path.join(__dirname, '../dist-client/')
      }
    }
  },
  {
    method: 'GET',
    path: '/cards',
    handler: require('./handlers/list-cards')
  },
  {
    method: 'GET',
    path: '/cards/{card_id}',
    handler: require('./handlers/get-card')
  },
  {
    method: 'PUT',
    path: '/cards/{card_id}',
    handler: require('./handlers/edit-card'),
    config: {
      validate: {
        payload: joi.object({
          card_number: joi.string(),
          rarity_number: joi.number().integer().min(1).max(7),
          rarity: joi.string().only(rarities),
          set_number: joi.number().integer().min(1).max(sets.length + 1),
          set: joi.string().only(sets),
          title: joi.string(),
          type: joi.string().only(['ally', 'physical_combat', 'energy_combat', 'main_personality', 'setup', 'drill', 'dragonball', 'event', 'mastery']),
          ability: joi.string(),
          alignment: joi.string().only(['hero', 'villain', 'neutral']),
          limit: joi.number().integer().min(1).max(3),
          style: joi.alternatives().when('type', {
            is: ['physical_combat', 'energy_combat', 'setup', 'drill', 'event', 'mastery'],
            then: joi.string().required(),
            otherwise: joi.forbidden()
          }),
          personality: joi.alternatives().when('type', {
            is: ['ally', 'main_personality'],
            then: joi.string().required(),
            otherwise: joi.forbidden()
          }),
          pur: joi.alternatives().when('type', {
            is: ['ally', 'main_personality'],
            then: joi.number().integer().min(1).required(),
            otherwise: joi.forbidden()
          }),
          level: joi.alternatives().when('type', {
            is: ['ally', 'main_personality'],
            then: joi.number().integer().min(1).max(4).required(),
            otherwise: joi.forbidden()
          }),
          stages: joi.alternatives().when('type', {
            is: ['ally', 'main_personality'],
            then: joi.array().items(joi.number()).length(11).required(),
            otherwise: joi.forbidden()
          }),
          is: joi.object({
            attack: joi.boolean(),
            block: joi.boolean(),
            prevention: joi.boolean(),
            instant: joi.boolean(),
            constant: joi.boolean()
          }),
          disables: joi.object({
            mppv: joi.boolean()
          }),
          has: joi.object({
            hit: joi.boolean(),
            shuffle: joi.boolean(),
            discard_removal: joi.boolean(),
            when_entering: joi.boolean(),
            search: joi.boolean(),
            draw: joi.boolean(),
            anger_raise: joi.boolean(),
            anger_lower: joi.boolean()
          }),
          image: joi.string(),
          _rev: joi.string()
        })
      }
    }
  },
  {
    method: 'POST',
    path: '/cards',
    handler: require('./handlers/create-card'),
    config: {
      payload: {
        output: 'file'
      },
      validate: {
        payload: joi.object({
          card_number: joi.string(),
          rarity_number: joi.number().integer().min(1).max(7),
          rarity: joi.string().only(rarities),
          set_number: joi.number().integer().min(1).max(sets.length + 1),
          set: joi.string().only(sets),
          title: joi.string(),
          type: joi.string().only(['ally', 'physical_combat', 'energy_combat', 'main_personality', 'setup', 'drill', 'dragonball', 'event', 'mastery']),
          ability: joi.string(),
          alignment: joi.string().only(['hero', 'villain', 'neutral']),
          limit: joi.number().integer().min(1).max(3),
          style: joi.alternatives().when('type', {
            is: ['physical_combat', 'energy_combat', 'setup', 'drill', 'event', 'mastery'],
            then: joi.string().required(),
            otherwise: joi.forbidden()
          }),
          personality: joi.alternatives().when('type', {
            is: ['ally', 'main_personality'],
            then: joi.string().required(),
            otherwise: joi.forbidden()
          }),
          pur: joi.alternatives().when('type', {
            is: ['ally', 'main_personality'],
            then: joi.number().integer().min(1).required(),
            otherwise: joi.forbidden()
          }),
          level: joi.alternatives().when('type', {
            is: ['ally', 'main_personality'],
            then: joi.number().integer().min(1).max(4).required(),
            otherwise: joi.forbidden()
          }),
          stages: joi.alternatives().when('type', {
            is: ['ally', 'main_personality'],
            then: joi.array().items(joi.number()).length(11).required(),
            otherwise: joi.forbidden()
          }),
          is: joi.object({
            attack: joi.boolean(),
            block: joi.boolean(),
            prevention: joi.boolean(),
            instant: joi.boolean(),
            constant: joi.boolean()
          }),
          disables: joi.object({
            mppv: joi.boolean()
          }),
          has: joi.object({
            hit: joi.boolean(),
            shuffle: joi.boolean(),
            discard_removal: joi.boolean(),
            when_entering: joi.boolean(),
            search: joi.boolean(),
            draw: joi.boolean(),
            anger_raise: joi.boolean(),
            anger_lower: joi.boolean()
          }),
          image_file: joi.any(),
          image: joi.string()
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/search/cards',
    handler: require('./handlers/search-cards')
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

module.exports = routes;
