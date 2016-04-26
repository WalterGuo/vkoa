'use strict';

let User = require('./user.model');
let omitList = ['salt', 'hashedPassword', 'activationCode', 'resetPasswordToken', 'resetPasswordExpires'];

exports.find = function*(next){
  var users = yield User.find({},'-salt -hashedPassword').exec();
  this.response.body = {
    status:0,
    msg:users
  };

}
exports.register = function *(next){
  let input =this.request.body;
  let user;
  try {
    user =  User.findOne({email:input.email});
    user = yield user.exec();
    if(user&&user._id){

      this.response.body={
        status:500,
        errCode:'50001',
        errMsg: 'user exist'
      }
      return;
    }
    let option ={
      email:input.email,
      nickname:input.nickname,
      password:input.password,
      header:input.header,
      phone:input.phone,
      sex:input.sex
    }
    let u = new User(option);
    user = yield u.save();
    this.status = 200;
    this.response.body = {
      status:0,
      msg:_.omit(user, omitList)
    };
  } catch (err) {
    this.throw(err);
  }

}
