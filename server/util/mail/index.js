const nodemailer = require('nodemailer');

const EmailTemplate = require('email-templates').EmailTemplate;
const QQexConfig = require('../../config/config');

const connection = {
  service: 'QQex',
  auth: {
    user: QQexConfig.QQex.email,
    pass: QQexConfig.QQex.pass
  }
}
const smtpTransport = nodemailer.createTransport(connection);

const templatesDir = path.resolve(__dirname, 'views')
const smtpSendMail = function(templateName,receiverEmail, locals,callback) {

  let template = new EmailTemplate(path.join(templatesDir, templateName));
  template.render(locals, function(err, results) {
    if (err) {
      return console.error(err)
    }

    return smtpTransport.sendMail({
      from: '白玉京 <no-reply@virgo.one>',
      to: receiverEmail,
      subject: '欢迎注册白玉京－账户Email验证',
      html: results.html,
      "attachments":attachments
    }, function(err, res) {
      if (err) {
        if(callback) return callback(err,null);
      }
      if(callback) return callback(null,res);
      return res;
    })
  })

}
