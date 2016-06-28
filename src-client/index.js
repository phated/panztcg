'use strict';

require('normalize.css');

const registerServiceWorker = require('./index.serviceworker');

if ('serviceWorker' in navigator) {
  registerServiceWorker({ scope: '/' }).then(console.log.bind(console), console.error.bind(console));
}

const React = require('react');

const { render } = require('react-dom');
const { Container, NavItem } = require('rebass');
const { Box } = require('reflexbox');

const {
  Navbar,
  CardDisplay,
  InfiniteScrollingContainer
} = require('./components');

const theme = require('./theme');
const resolver = require('./lib/data-resolver');

const OFFSET = 9;

const SmartScrollingContainer = resolver(InfiniteScrollingContainer);

class Application extends React.Component {

  getChildContext() {
    return {
      rebass: theme
    };
  }

  render() {
    return (
      <div>
        <Navbar>
          <NavItem href="http://panz.cards">PanZ.cards</NavItem>
        </Navbar>
        <Container>
          <SmartScrollingContainer offset={OFFSET}>
            {(card) => (<Box key={card._id} p={1} auto><CardDisplay {...card} /></Box>)}
          </SmartScrollingContainer>
        </Container>
      </div>
    );
  }
}

Application.childContextTypes = {
  rebass: React.PropTypes.object
};

const container = document.getElementById('root');

render(<Application />, container);
