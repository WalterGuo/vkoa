'use strict';

let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let BookSchema = new Schema({
  cat: Number, // 1 new 2 blog
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  author: {
    type: String
  },
  description: {
    type: String
  },
  hidden: {
    type: Number,
    default: 0 // 0 显示 1 隐藏
  }
});

module.exports = vkoaMongo.model('Book', BookSchema);
