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

let webpackDevMiddleware = require('koa-webpack-dev-middleware')
  let webpack = require('webpack')
  let webpackConf = require('../../webpack.config.babel')
  let compiler = webpack(webpackConf)

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
    app.use(serve(path.join(config.root, '.tmp')));
    app.use(serve(path.join(config.root, 'client')));
    app.use(serve(path.join(config.root, 'node_modules')));


      // 为使用Koa做服务器配置koa-webpack-dev-middleware
      app.use(webpackDevMiddleware(compiler, webpackConf.devServer))

      // 为实现HMR配置webpack-hot-middleware
      let hotMiddleware = require("webpack-hot-middleware")(compiler);
      // Koa对webpack-hot-middleware做适配
      app.use(function* (next) {
        yield hotMiddleware.bind(null, this.req, this.res);
        yield next;
      });
  }
};
