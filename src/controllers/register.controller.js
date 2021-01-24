const User = require("../models/user.model");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const saltRounds = 10;

module.exports.index = async (req, res) => {
  const result = {};
  const email = req.body.email;
  const password = req.body.password; // password input
  const username = req.body.username;
  const name = req.body.name;

  const checkExist = await User.findOne({ username: username });
  const checkEmail = await User.findOne({ email: email });
  if (checkExist) {
    // if username is registered
    result.error = "Tên người dùng đã tồn tại";
  } else if (checkEmail) {
    result.error = "Email đã được sử dụng cho tài khoản khác";
  } else {
    // hash password
    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = {
      email: email,
      password: hash,
      postId: [],
      avt: "",
      username: username,
      refreshToken: "",
      name: name,
    };
    // create token and refreshtoken
    const privateTokenKey = fs.readFileSync(
      path.resolve(__dirname, "./login/keys/privateToken.key")
    );
    const privateRefreshKey = fs.readFileSync(
      path.resolve(__dirname, "./login/keys/privateRefresh.key")
    );
    const token = jwt.sign(
      {
        username: username,
        email: email,
      },
      privateTokenKey,
      { algorithm: "RS256", expiresIn: process.env.EXPIRESIN_TOKEN }
    );

    const refreshToken = jwt.sign(
      {
        username: username,
        email: email,
      },
      privateRefreshKey,
      { algorithm: "RS256", expiresIn: process.env.EXPIRESIN_REFRESHTOKEN }
    );

    newUser.refreshToken = refreshToken;
    if (refreshToken && token) {
      await User.create(newUser);
      result.token = token;
      result.isRegister = true;
    }
  }

  res.json(result);
};
