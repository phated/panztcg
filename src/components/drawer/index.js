'use strict';

const React = require('react');
const bindClasses = require('classnames/bind');

const baseClasses = require('./drawer.css');

const classnames = bindClasses.bind(baseClasses);

function Drawer(props){

  const { children, className, open } = props;

  const classes = classnames('drawer', { open }, className);

  return (
    <div {...props} className={classes}>
      {children}
    </div>
  );
}

module.exports = Drawer;
