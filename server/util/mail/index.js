'use strict';

// Cb2bl2a0MJ66xJ1Z
let nodemailer = require('nodemailer');
let smtpTransport = nodemailer.createTransport('smtps://no-reply@virgo.one:gQf3UaHv5yfZ084o@smtp.exmail.qq.com');


let sendMail = function *(receiverEmail,name){
  let mailOptions = {
    from: 'no-reply<no-reply@virgo.one>', // sender address
    to: receiverEmail, // list of receivers
    subject: name, // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
  };
  console.log("mail send");
  return yield smtpTransport.sendMail(mailOptions);
}
exports.sendValidateCode = function(receiverEmail){
  return sendMail(receiverEmail, "账户确认邮件");
}
