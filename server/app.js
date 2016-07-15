'use strict'
import "babel-polyfill";
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import koa from 'koa';
const app = new koa();
import config from './config/environment';

import mongoose from "mongoose";
import _ from 'lodash';

let vkoaMongo = mongoose.createConnection(config.mongo.uri);
vkoaMongo.on('error', function(err) {
    console.error('vkoaMongo mongodb connection failed!', err);
    vkoaMongo.db.close();
  }).on('connected', function() {
    console.log('vkoaMongo mongodb connect success') //, blogConn);
})
global.vkoaMongo = vkoaMongo;
global._ = _;
global.config = config;
global.redis = require('./util/redis');


require('./config/koa')(app);
require('./routes')(app);

if (!module.parent) {
  app.listen(config.port, config.ip, function() {
    console.log('Koa server listening on %d, in %s mode', config.port, config.env);
  });
}

exports = module.exports = app;
