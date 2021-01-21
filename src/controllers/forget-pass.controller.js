const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

module.exports.index = async (req, res) => {
  const email = req.body.email; // email user input
  const user = await User.findOne({ email: email });
  if (!user) {
    res.json({ error: "Email not exist" });
    return;
  }
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
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <style>
            .header { padding-bottom: 15px;}
            .code {
              margin-top: 25px;
              margin-bottom: 25px;
              padding: 10px;
              width: 100px;

              border: 1px solid #DFDEDE;
              background-color: #DFDEDE;

              font-size: 16px;
              text-align:center;
            }

            p {font-size: 14px;}
            a {text-decoration: none;}

            
            .footer{
              margin-top: 50px;
            }
            
            
        </style>
    </head>
    <body>
        <p><span class="header">Xin chào <b>${user.name}</b></span>,</p>
        <p>
            Chúng tôi đã nhận được yêu cầu đặt <br>lại mật khẩu Oldy của bạn.<br>Nhập mã đặt lại
            mật khẩu của bạn sau đây:
        </p>
        <div class="code"><code>${code}</code></div>
        <p class = "footer"><b>Bạn đã không yêu cầu thay đổi này</b></p>
        <p>Nếu bạn không yêu cầu mật khẩu mới,<br><a href="#">hãy cho chúng tôi biết.</a></p>
        <img src= "https://res.cloudinary.com/dfcvhqdl0/image/upload/v1611196081/Oldy/logo_size_etqzra.jpg">
    </body>
    </html>
    `,
  };

  // send mail
  await transporter.sendMail(mailContent);

  res.json({ code: code });
};
