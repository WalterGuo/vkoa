'use strict';

let User = require('./user.model');

exports.find = function*(next){
  var users = yield User.find().exec();
  this.response.body = {
    msg:users
  };

}
