'use strict';
let video = require("./video.controller");
const router = require('koa-router')();
//
// router.get('/', user.find);
router.post('/', video.create);

module.exports = router
