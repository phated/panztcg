'use strict';

const React = require('react');
const { Fixed, Toolbar } = require('rebass');

function Navbar({ children }) {
  return (
    <Fixed top left right zIndex={1}>
      <Toolbar>
        {children}
      </Toolbar>
    </Fixed>
  );
}

module.exports = Navbar;
