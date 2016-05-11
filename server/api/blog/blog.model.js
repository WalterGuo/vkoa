'use strict';

let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let BlogSchema = new Schema({
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
  poster:{
    type:String
  }
});

module.exports = vkoaMongo.model('Blog', BlogSchema);
