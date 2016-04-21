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

  }
};
