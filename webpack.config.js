'use strict';

var path = require('path');

var webpack = require('webpack');

var isTest = (process.argv.indexOf('--test') !== -1);
var isProd = (process.argv.indexOf('--prod') !== -1);

var bundle = [
  path.join(__dirname, './src/client.js')
];
var plugins = [];
var loaders = [{
  test: /\.js$/,
  exclude: [
    /node_modules/
  ],
  loader: 'babel-loader'
},{
  test: /\.css$/,
  exclude: [
    /node_modules/
  ],
  loaders: [
    'style-loader',
    'css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]'
  ]
},{
  test: require.resolve('normalize.css'),
  loaders: [
    'style-loader',
    'css-loader'
  ]
}];

// I think order is important for all of these
// if(!isProd && !isTest){
//   bundle.unshift(
//     'webpack-dev-server/client?http://localhost:8080',
//     'webpack/hot/only-dev-server'
//   );

//   plugins.unshift(
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NoErrorsPlugin()
//   );

//   loaders.unshift({
//     test: /\.js$/,
//     exclude: [
//       /node_modules/
//     ],
//     loader: 'react-hot-loader'
//   });
// }

if(isTest){
  loaders.push({
    test: /\.js$/,
    exclude: [
      /__tests__/,
      /node_modules/
    ],
    loader: 'isparta-loader'
  });
}

if(isProd){
  // TODO: prod config
}

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    bundle: bundle
  },
  output: {
    filename: '[name].js',
    path: __dirname,
    pathinfo: !isProd
  },
  plugins: plugins,
  module: {
    loaders: loaders
  },
  resolveLoader: {
    // this is a workaround for loaders being applied
    // to linked modules
    root: path.join(__dirname, 'node_modules')
  },
  resolve: {
    // this is a workaround for aliasing a top level dependency
    // inside a symlinked subdependency
    root: path.join(__dirname, 'node_modules')
  },
  devServer: {
    // hot: true
  }
};
