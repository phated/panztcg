'use strict';

const React = require('react');
const bindClasses = require('classnames/bind');

const baseClasses = require('./navbar.css');

const classnames = bindClasses.bind(baseClasses);

function Navbar(props){

  const { children, className, drawerOpen } = props;

  const classes = classnames('navbar', { drawerOpen }, className);

  return (
    <nav {...props} className={classes}>
      {children}
    </nav>
  );
}

module.exports = Navbar;
