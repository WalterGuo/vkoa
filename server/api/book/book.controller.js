'use strict';

let Book = require('./book.model');

exports.find = function*(ctx,next){
  console.log(ctx);
  var books = yield Book.find({});
  this.response.body = "hello world!";

  // this.body = yield this.render('404', {'books': books});
}
