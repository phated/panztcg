'use strict';

const React = require('react');
const { Flex } = require('reflexbox');

// Has to extend React.Component for refs
class FlexContainer extends React.Component {

  render() {
    return (
      <Flex wrap auto>
        {this.props.children}
      </Flex>
    );
  }
}

module.exports = FlexContainer;
