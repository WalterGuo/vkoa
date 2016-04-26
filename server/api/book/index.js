'use strict';
let book = require("./book.controller");
const koa = require('koa');
const app = new koa();
const router = require('koa-router')();

router.get('/', book.find);
router.post('/', book.create);
app.use(router.routes())
  .use(router.allowedMethods());
module.exports = app
