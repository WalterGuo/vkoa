// import webpack from 'webpack';
// import path from 'path';
'use strict';

let webpack = require('webpack');
let path = require('path');
let publicPath = 'http://localhost:1235/';
let hotMiddlewareScript = 'webpack-hot-middleware/client?http://localhost:1235/__webpack_hmr';
module.exports = {
  entry: {
    index: [hotMiddlewareScript,'./client/application/index.js'],
  },
  module: {
    loaders: [
    {
      test: /\.js/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015'],
      }
    }, ]
  },
  devServer: {
    hot: true,
    noInfo: false,
    inline: true,
    publicPath: publicPath,
    stats: {
      cached: false,
      colors: true
    }
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
  },
  output: {
    path: path.resolve('.tmp/build'),
    filename: '[name].bundle.js',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
}
