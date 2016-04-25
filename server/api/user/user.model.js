'use strict';

let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let UserSchema = new Schema({
  nickname: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true
  },
  role: {
    type: String,
    default: 'user'
  },
  hashedPassword: String,
  
  header: {
    type: String
  },
  sex: {
    type: String
  },
  phone: {
    type: Number
  }
});

module.exports = vkoaMongo.model('User', UserSchema);
