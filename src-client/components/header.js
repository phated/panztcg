'use strict';

const React = require('react');
const { Banner } = require('rebass');

function Header({ children }) {
  return (
    <Banner>
      {children}
    </Banner>
  );
}

module.exports = Header;
