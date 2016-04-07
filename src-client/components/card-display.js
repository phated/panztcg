'use strict';

const { assign } = require('lodash');
const React = require('react');
const {
  Card,
  CardImage,
  Heading,
  Text
} = require('rebass');

const baseStyle = {
  minHeight: 420,
  minWidth: 240,
  borderRadius: 4,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'contain'
};

function CardDisplay({ image }) {
  if (!image) {
    return (
      <div style={baseStyle} />
    );
  }

  const style = assign({}, baseStyle, {
    backgroundImage: `url(${image})`
  });

  return (
    <div style={style} />
  );
}

module.exports = CardDisplay;
