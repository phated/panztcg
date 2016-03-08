'use strict';

const React = require('react');
const bindClasses = require('classnames/bind');

const baseClasses = require('./navbar-link.css');

const classnames = bindClasses.bind(baseClasses);

function NavbarLink(props){

  const { children, className } = props;

  const classes = classnames('navbar-link', className);

  return (
    <a {...props} className={classes}>
      {children}
    </a>
  );
}

module.exports = NavbarLink;
