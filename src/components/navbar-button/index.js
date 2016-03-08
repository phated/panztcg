'use strict';

const React = require('react');
const bindClasses = require('classnames/bind');

const baseClasses = require('./navbar-button.css');

const classnames = bindClasses.bind(baseClasses);

function NavbarButton(props){

  const { children, className } = props;

  const classes = classnames('navbar-button', className);

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
}

module.exports = NavbarButton;
