const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

module.exports.index = async (req, res) => {
  const email = req.body.email; // email user input
  const user = await User.findOne({ email: email });
  // account to send mail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.PASSWORD_ACCOUNT,
    },
  });
  // recovery code
  let code = Math.trunc(Math.random() * 1000000).toString();
  if (code.length == 5) {
    code = 0 + code;
  }
  // content of mail
  const mailContent = {
    from: "Oldy",
    to: email,
    subject: `${code} là mã khôi phục tài khoản Oldy của bạn`,
    text: "hi",
    html: `<!doctype html>
    <html ⚡4email>
    <head>
        <meta charset="utf-8">
        <style>
            span {text-align: center; font-size: 20px; display: block;}
            p {font-size: 16px;}
        </style>
    </head>
    <body>
        <p>Xin chào <b>${user.name}</b>,</p>
        <p>
            Chúng tôi đã nhận được yêu cầu đặt <br>lại mật khẩu Oldy của bạn.<br>Nhập mã đặt lại
            mật khẩu của bạn sau đây:
        </p>
        <span><code>${code}</code></span>
    </body>
    </html>
    `,
  };

  // send mail
  transporter.sendMail(mailContent, (err, data) => {
    if (err) {
      console.log("Error");
    } else {
      console.log("Sent");
    }
  });
};
