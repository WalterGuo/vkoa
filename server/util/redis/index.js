'use strict';

let Redis = require('ioredis');
let redis =  new Redis(config.redis);
redis.on("connect", function () {
  console.log('redis connect success ... ');
});
redis.on("error", function (err) {
  console.log("redis Error : " + err);
});
exports.redis = redis;
