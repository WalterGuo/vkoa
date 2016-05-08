/**
 * Koa config
 */

'use strict';

const config = require('./environment');
const bodyparser = require('koa-bodyparser');
const serve = require("koa-static");
const path = require("path");
const views = require("koa-render");
const logger = require('koa-logger');
// const webpackDevMiddleware = require('koa-webpack-dev-middleware');
const webpack = require('webpack');
const webpackConf = require('../../webpack.config.babel');
const webpackDevMiddleware = require('webpack-dev-middleware');



module.exports = function(app) {
  let env = app.env;
  app.use(bodyparser());
  app.use(views(config.root + '/server/views', 'jade'));
  app.use(logger());
  if ('production' === env) {
    // app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(serve(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/public');
  }

  if ('development' === env || 'test' === env) {
    app.use(serve(path.join(config.root, 'build')));
    app.use(serve(path.join(config.root, 'client')));
    // app.use(serve(path.join(config.root, 'node_modules')));


    // let compiler = webpack(webpackConf)
    // app.use(require("koa-webpack-dev-middleware")(compiler, webpackConf.devServer));
    // let hotMiddleware = require("webpack-hot-middleware")(compiler);
    // app.use(function* (next) {
    //   yield hotMiddleware.bind(null, this.req, this.res);
    //   yield next;
    // });
  }

};
