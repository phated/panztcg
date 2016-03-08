'use strict';

require('normalize.css');

const React = require('react');
const ReactDOM = require('react-dom');
// const createStore = require('@phated/redux-create-store');

// const reducers = require('./reducers');
// const storeConfig = require('./config/store');
const Index = require('./views/index');

// const store = createStore(reducers, storeConfig);

const container = document.createElement('div');

ReactDOM.render(<Index />, container);

document.body.appendChild(container);

// if(module.hot){
//   module.hot.accept('./reducers', function(){
//     const newReducers = require('./reducers');
//     const newStore = createStore(newReducers, storeConfig);
//     const replacementReducer = newStore.getReducer();
//     store.replaceReducer(replacementReducer);
//     ReactDOM.render(<Index store={store} />, container);
//   });
// }
