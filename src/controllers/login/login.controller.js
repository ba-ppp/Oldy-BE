const User = require("../../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const login = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const nonPassword = req.body.password; // password input

  let result = {
    error: "",
    isLogin: false,
  };

  let user = await User.findOne({ username: username }); // check username is exist
  if (!user) {
    user = await User.findOne({ email: email });
  }
  // if username exist
  if (user) {
    const password = user.password; // password real
    const checkPassword = await bcrypt.compare(nonPassword, password); // check password

    if (checkPassword) {
      // if password correct
      //keys
      const privateTokenKey = fs.readFileSync(
        path.resolve(__dirname, "./keys/privateToken.key")
      );
      const privateRefreshKey = fs.readFileSync(
        path.resolve(__dirname, "./keys/privateRefresh.key")
      );
      //token
      const token = jwt.sign(
        {
          _id: user._id,
          username: user.username,
        },
        privateTokenKey,
        { algorithm: "RS256", expiresIn: process.env.EXPIRESIN_TOKEN }
      );

      const refreshToken = jwt.sign(
        {
          _id: user._id,
          username: user.username,
        },
        privateRefreshKey,
        { algorithm: "RS256", expiresIn: process.env.EXPIRESIN_TOKEN }
      );

      result.refreshToken = refreshToken;
      result.token = token;
      result.isLogin = true;

      // save refreshToken to user's db
      await User.updateOne(
        { username: username },
        { refreshToken: refreshToken }
      );
    } else {
      result.error = "Tên người dùng hoặc mật khẩu không đúng";
    }
  } else {
    result.error = "Tên người dùng hoặc mật khẩu không đúng";
  }

  res.json(result);
};

module.exports.login = login;
