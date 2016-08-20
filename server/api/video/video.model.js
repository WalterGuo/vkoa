'use strict';

let mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin;

let VideoSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: '[400]请提供视频标题'
  }, // 标题
  description: {
    type: String,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  cover:{
    type:String,
    trim: true
  },
  category: {
    type: String
  },
  type: {
    type: String
  }
});
VideoSchema.plugin(createdModifiedPlugin, {
  index: true
});

module.exports = vkoaMongo.model('Video', VideoSchema);
