'use strict';

const React = require('react');
const bindClasses = require('classnames/bind');

const baseClasses = require('./container.css');

const classnames = bindClasses.bind(baseClasses);

function Container(props){

  const { children, className } = props;

  const classes = classnames('container', className);

  return (
    <div {...props} className={classes}>
      {children}
    </div>
  );
}

module.exports = Container;
