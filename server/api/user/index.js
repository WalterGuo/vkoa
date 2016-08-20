'use strict';
let user = require("./user.controller");
const router = require('koa-router')();

router.get('/', user.find);
router.post('/', user.create);

module.exports = router
