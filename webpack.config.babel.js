var path = require('path');
var NpmInstallPlugin = require('npm-install-webpack-plugin');
var webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'client/application'),
  build: path.join(__dirname, '.tmp/build')
};

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET

module.exports = {
  entry: PATHS.app,
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      path.resolve('./node_modules'),
    ]
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
    {
      test: /\.css$/,
      loaders: ['style', 'css'],
      include: PATHS.app
    },
    {
      test: /\.jsx?$/,
      loader: 'babel',
      include: PATHS.app,
      query: {
        presets: ['react', 'es2015']
      }
    }]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
  },
  devServer: {
    contentBase: PATHS.build, //Relative directory for base of server
    devtool: 'eval',
    hot: true, //Live-reload
    inline: true,
    state:{
      colors:true
    },
    port: 1235,
    host: '127.0.0.1'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new NpmInstallPlugin({
      save: true // --save
    })
  ]
};
