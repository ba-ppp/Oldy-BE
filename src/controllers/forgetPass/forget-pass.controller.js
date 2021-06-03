const User = require("../../models/user.model");
const path = require("path");
const nodemailer = require("nodemailer");
const fs = require("fs");
const jwt = require("jsonwebtoken");

module.exports.index = async (req, res) => {
  const account = req.body.account.toLowerCase(); // email user input
  // key
  const privateTokenKey = fs.readFileSync(
    path.resolve(__dirname, "../login/keys/privateToken.key")
  );

  let user = await User.findOne({ email: account });

  if (!user) {
    user = await User.findOne({ username: account });
  }

  if (!user) {
    res.json({ errorCode: 1, error: "Email not exist" });
    return;
  }
  const result = {
    id: user._id,
    avt: user.avt,
    email: user.email,
    username: user.username,
    name: user.name,
    errorCode: 0,
  }

  // generate token
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    privateTokenKey,
    { algorithm: "RS256", expiresIn: process.env.EXPIRESIN_TOKEN }
  );
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
    // if code is started with 0
    code = "0" + code;
  }
  
  // content of mail
  const mailContent = {
    from: '"Oldy Team" <contact.oldy.team@gmail.com>',
    to: user.email,
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
        <p><span class="header">Xin chào <b>${user.username}</b></span>,</p>
        <p>
            Chúng tôi đã nhận được yêu cầu đặt <br>lại mật khẩu Oldy của bạn.<br>Nhập mã đặt lại
            mật khẩu của bạn sau đây:
        </p>
        <div class="code"><code>${code}</code></div>
        <p class = "footer"><b>Bạn đã không yêu cầu thay đổi này</b></p>
        <p>Nếu bạn không yêu cầu mật khẩu mới,<br><a href="#">hãy cho chúng tôi biết.</a></p>
        <img src= "https://res.cloudinary.com/dfcvhqdl0/image/upload/v1616380626/Oldy/logo_192x192_w_kpzdfd.jpg">
    </body>
    </html>
    `,
  };

  // send mail
  await transporter.sendMail(mailContent);
  result.code = code;
  result.token = token;
  res.json(result);
};
