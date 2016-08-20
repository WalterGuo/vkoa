'use strict';

const User = require('./user.model');
let omitList = ['salt', 'hashedPassword', 'activationCode', 'resetPasswordToken', 'resetPasswordExpires'];
import {isEmail,isMobilePhone} from '../../util';
exports.find = async(ctx, next) => {
  const users = await User.find({}, '-salt -hashedPassword').exec();
  ctx.body = {
    status: 0,
    message: users
  };

}
exports.create = async(ctx,next)=>{
  const reqBody = ctx.request.body;
  let schema={},errorText;
  let email = reqBody.email,
    name = reqBody.name,
    password = reqBody.password,
    phone = reqBody.phone,
    header = reqBody.header;

    if(!isEmail(email)){
      ctx.throw(400, '邮箱格式不正确')
    }
    if(!isMobilePhone(phone,'zh-CN')){
      ctx.throw(400, '手机格式不正确')
    }
    schema.email = email;
    schema.name = name;
    schema.password = password;
    schema.phone = phone;
    schema.header = header;
    const user = await new User(schema).save();
    ctx.status = 201;
    ctx.body = {
      status: 0,
      message: user
    };
}
