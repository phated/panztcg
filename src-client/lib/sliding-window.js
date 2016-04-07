'use strict';

function binarySearchForFirstVisibleChild(children) {
  let low = 0;
  let high = children.length;

  while (low < high) {
    const mid = (low + high) >>> 1; // faster version of Math.floor((low + high) / 2)
    const rect = children[mid].getBoundingClientRect();
    const val = rect.bottom;
    if (val < 0) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}

function binarySearchForFirstInvisibleChild(start, children) {
  const windowHeight = window.innerHeight;

  let low = start;
  let high = children.length;

  while (low < high) {
    const mid = (low + high) >>> 1; // faster version of Math.floor((low + high) / 2)
    const rect = children[mid].getBoundingClientRect();
    const val = rect.top;
    if (val < windowHeight) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}

function slidingWindow(elements, offset) {
  const start = binarySearchForFirstVisibleChild(elements);
  const end = binarySearchForFirstInvisibleChild(start, elements);

  return {
    start: Math.max(0, start - offset),
    end: end + offset
  };
}

module.exports = slidingWindow;
