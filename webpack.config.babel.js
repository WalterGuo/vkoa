const webpack = require('webpack');
const path = require('path');
const yargs = require('yargs');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const TransferWebpackPlugin = require('transfer-webpack-plugin');
const argv = yargs
  .alias('p', 'optimize')
  .alias('d', 'development')
  .alias('s', 'dev-server')
  .argv

const options = {
  development: argv.development,
  optimize: argv.optimize,
  devServer: argv.devServer,
  devServerPort: 2333,
  publicPath: argv.devServer ? '/.tmp/' : '',
  statsExclude: [/node_modules/],
  outputPath: '.tmp/build',
  outputJs: 'bundle.js',
  outputCss: 'app.css',
}
const environment = options.development ? 'development' : 'production'
const reactLoader = options.development ? 'react-hot!babel' : 'babel'
const chunkFilename = options.devServer ? '[id].js' : '[name].js'
const devtool = options.development ? 'cheap-module-eval-source-map' : null
const styleLoader =
  'style' +
  '!css?modules&importLoaders=1&localIdentName=[path][name]__[local]__[hash:base64:5]' +
  '!autoprefixer' +
  '!sass'


// Plugins
const optimizePlugins = options.optimize ? [
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.NoErrorsPlugin(),
] : []
const extraPlugins = [

]
const config = {
  //Entry points to the project
  entry: {
    app: ['./client/application/index.js'],
  },
  //Config options on how to interpret requires imports
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
  },
  devServer: {
    host: 'localhost',
    port: options.devServerPort,
    stats: {
      exclude: options.statsExclude,
    },
  },
  devtool: devtool,
  eslint: {
    fix: true,
  },
  output: {
    path: path.join(__dirname, options.outputPath),
    filename: options.outputJs,
    chunkFilename: chunkFilename,
    publicPath: options.publicPath,
    sourceMapFilename: 'debugging/[file].map',
  },
  plugins: [
    new webpack.PrefetchPlugin('react'),
    new webpack.PrefetchPlugin('react-dom'),
    new webpack.PrefetchPlugin('react-css-modules'),
    new HtmlWebpackPlugin({
      chunks: ['app']
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(environment),
      },
    }),
  ].concat(optimizePlugins, extraPlugins),
  module: {
    preLoaders: [
    {
      test: /\.(js|jsx)/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }, ],
    loaders: [
    {
      test: /\.scss/,
      loader: styleLoader,
      exclude: /node_modules/
    },
    {
      test: /\.(js|jsx)/,
      loader: reactLoader,
      exclude: /node_modules/
    },
    {
      test: /\.json/,
      loader: 'json'
    },
    {
      test: /\.(woff|woff2)/,
      loader: 'url?limit=100000'
    },
    {
      test: /\.(png|jpg|jpeg|gif|svg)/,
      loader: 'url?limit=100000'
    },
    {
      test: /\.(ttf|eot)/,
      loader: 'file'
    }, ],
  }

};

module.exports = config;
