'use strict'

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const koa = require('koa');
const app = new koa();
const config = require('./config/environment');
const mongoose = require("mongoose");

require('./config/koa')(app);
require('./routes')(app);
let vkoaMongo = mongoose.createConnection(config.mongo.uri);
vkoaMongo.on('error', function(err) {
    console.error('blogConn mongodb connection failed!', err);
    blogConn.db.close();
  }).on('connected', function() {
    console.log('blogConn mongodb connect success') //, blogConn);
})
global.vkoaMongo = vkoaMongo;



if (!module.parent) {
  app.listen(config.port, config.ip, function() {
    console.log('Koa server listening on %d, in %s mode', config.port, config.env);
  });
}

exports = module.exports = app;
