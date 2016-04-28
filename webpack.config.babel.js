import webpack from 'webpack';
import path from 'path';

export default {
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
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
  },
  output: {
    path:'.tmp/build',
    filename: '[name].bundle.js',
  }
}
