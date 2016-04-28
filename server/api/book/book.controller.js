'use strict';

let Book = require('./book.model');

exports.find = function*(next){
  var books = yield Book.find().exec();
  // this.response.body = "hello world!";
  this.response.body = {
    status:0,
    msg:books
  };

  // this.body = yield this.render('404', {'books': books});
}
exports.create = function*(ctx,next){

  let input =this.request.body;
  let poster = "http://7xr9m4.com1.z0.glb.clouddn.com/%40%2Fcustomer%2F2%2F%E6%B1%A4%E5%94%AF.jpg";
  let option = {
    title:input.title,
    content:input.content,
    author:input.author,
    description:input.description,
    poster:input.poster?input.poster:poster
  }
  let books ;
  try {
    let b = new Book(option);
    books = yield b.save();
    this.status = 201;
    this.response.body = {
      status:0,
      msg:books
    };

  } catch (err) {
    this.throw(err);
  }

}
