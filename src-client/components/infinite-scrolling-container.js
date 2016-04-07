'use strict';

const React = require('react');
const { findDOMNode } = require('react-dom');
const { map, debounce } = require('lodash');

const FlexContainer = require('./flex-container');
const slidingWindow = require('../lib/sliding-window');

class InfiniteScrollingContainer extends React.Component {

  constructor(...args) {
    super(...args);

    const { offset } = this.props;

    this.state = {
      start: 0,
      end: offset
    };
  }

  componentDidMount() {
    const { offset } = this.props;

    const container = findDOMNode(this._flexContainer);

    window.addEventListener('scroll', debounce(() => {
      if (!container) {
        return;
      }

      const { start, end } = slidingWindow(container.children, offset);

      this.setState({ start, end });
    }), 250);
  }

  render() {
    const { children, data } = this.props;
    const { start, end } = this.state;

    const activeSlice = data.active.slice(start, end);
    const inactiveBegin = data.inactive.slice(0, start);
    const inactiveEnd = data.inactive.slice(end + 1);

    const stubbedSlice = inactiveBegin.concat(activeSlice, inactiveEnd);
    const cards = map(stubbedSlice, children);

    return (
      <FlexContainer ref={(c) => this._flexContainer = c}>
        {cards}
      </FlexContainer>
    );
  }
}

module.exports = InfiniteScrollingContainer;
