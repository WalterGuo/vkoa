// import webpack from 'webpack';
// import path from 'path';
'use strict';

let webpack = require('webpack');
let path = require('path');
let publicPath = '/';

module.exports = {
  entry: {
    'index': './client/application/index.js',
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
    path: '.tmp/build',
    filename: '[name].bundle.js',
  }
}
