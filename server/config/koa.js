'use strict';
import config from './environment';
import bodyparser from 'koa-bodyparser';
import serve from 'koa-static';
import path from 'path';
import views from 'koa-render';
import logger from 'koa-logger';
import webpack from 'webpack';
import webpackConf from '../../webpack.config.babel';
import livereload from 'koa-livereload';


module.exports = function(app) {
  let env = app.env;
  app.use(bodyparser());
  app.use(views(config.root + '/server/views', 'jade'));
  app.use(logger());
  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(serve(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/public');
  }

  if ('development' === env || 'test' === env) {
    app.use(serve(path.join(config.root, 'build')));
    app.use(serve(path.join(config.root, 'client')));
    app.use(livereload({
      port : 33333
    }));
    let compiler = webpack(webpackConf)
    app.use(require('koa-webpack-dev-middleware')(compiler, webpackConf.devServer));
    let hotMiddleware = require('webpack-hot-middleware')(compiler);
    app.use(function* (next) {
      yield hotMiddleware.bind(null, this.req, this.res);
      yield next;
    });
  }

};
