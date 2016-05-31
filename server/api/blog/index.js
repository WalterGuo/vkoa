'use strict';
let blog = require("./blog.controller");
const koa = require('koa');
const app = new koa();
const router = require('koa-router')();

router.get('/', blog.find);
router.post('/', blog.create);
app.use(router.routes())
  .use(router.allowedMethods());
module.exports = app
