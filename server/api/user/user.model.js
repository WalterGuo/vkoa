'use strict';

let mongoose = require('mongoose'),
  Schema = mongoose.Schema,
 createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin,
 crypto = require('crypto');

let UserSchema = new Schema({
  name: {
    type: String,
    unique: true
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
    type: Number,
    default: 0
  },
  phone: {
    type: Number,
    unique: true
  }
});
UserSchema.path('email').validate(function (email) {
  return email.length;
}, 'Email cannot be blank');

// Validate empty password
UserSchema.path('hashedPassword').validate(function (hashedPassword) {
  return hashedPassword.length;
}, 'Password cannot be blank');

UserSchema.virtual('password').set(function (password) {
  this._password = password;
  this.salt = this.makeSalt();
  this.hashedPassword = this.encryptPassword(password);
}).get(function () {
  return this._password;
});
UserSchema.virtual('token').get(function () {
  return {
    '_id' : this._id,
    'email':this.email,
    'role': this.role
  };
});

UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function () {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function (password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

UserSchema.plugin(createdModifiedPlugin, {index: true});

module.exports = vkoaMongo.model('User', UserSchema);
