'use strict';

const React = require('react');
const { createContainer } = require('sovereign');

const Container = require('../components/container');
const Drawer = require('../components/drawer');
const Navbar = require('../components/navbar');
const NavbarLink = require('../components/navbar-link');
const NavbarButton = require('../components/navbar-button');

class Application extends React.Component {
  constructor(...args){
    super(...args);

    this.state = {
      open: false
    };

    this.open = this.open.bind(this);
  }

  open(){
    this.setState({ open: !this.state.open });
  }

  render(){
    const { open } = this.state;

    return (
      <Container>
        <Navbar>
          <NavbarButton onClick={this.open}>Menu</NavbarButton>
          <NavbarLink href="/">Home</NavbarLink>
        </Navbar>
        <Drawer open={open}>
          Content
        </Drawer>
        <h1>Hello starter</h1>
        <div>Example:</div>
      </Container>
    );
  }
}

module.exports = createContainer(Application, {
  getStores({ store }){
    return {
      store
    };
  },

  getPropsFromStores({ store }){
    const { count } = store.getState();

    return {
      count
    };
  }
});
