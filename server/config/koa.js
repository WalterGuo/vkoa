'use strict';
const config = require('./environment');
const bodyparser = require('koa-bodyparser')();
const serve = require('koa-static');
const path = require('path');
const views = require('koa-views');
const logger = require('koa-logger');
const webpack = require('webpack');
const webpackConf = require('../../webpack.config.babel');
const livereload = require('koa-livereload');
const convert = require('koa-convert');
const json = require('koa-json');

module.exports = function(app) {
  let env = app.env;
  app.use(convert(bodyparser));
  app.use(convert(json()));
  app.use(convert(logger()));
  app.use(views(config.root + '/server/views',{ extension: 'jade' }));

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(serve(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/public');
  }

  if ('development' === env || 'test' === env) {
    app.use(serve(path.join(config.root, 'build')));
    app.use(serve(path.join(config.root, 'client')));
    console.log("development");
    // app.use(livereload({
    //   port : 33333
    // }));
    let compiler = webpack(webpackConf)
    app.use(require('koa-webpack-dev-middleware')(compiler, webpackConf.devServer));
    let hotMiddleware = require('webpack-hot-middleware')(compiler);
    app.use(async (ctx,next)=> {
      await hotMiddleware.bind(null, ctx.req, ctx.res);
      await next();
    });
  }

};
