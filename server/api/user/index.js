'use strict';
let user = require("./user.controller");
const koa = require('koa');
const app = new koa();
const router = require('koa-router')();

router.get('/', user.find);
router.post('/register', user.register);

app.use(router.routes())
  .use(router.allowedMethods());
module.exports = app
