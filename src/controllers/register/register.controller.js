const User = require("../../models/user.model");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

module.exports.index = async (req, res) => {
  const result = {
    errorCode: 0
  };
  const email = req.body.email;
  const password = req.body.password; // password input
  const username = req.body.username;
  const name = req.body.name;

  const checkExist = await User.findOne({ username: username });
  const checkEmail = await User.findOne({ email: email });
  if (checkExist) {
    // if username is registered
    result.error = "Tên người dùng đã tồn tại";
    result.errorCode = 1;
  } else if (checkEmail) {
    result.error = "Email đã được sử dụng cho tài khoản khác";
    result.errorCode = 1;
  } else {
    // hash password
    const hash = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS_BCRYPT)
    );
    // create objectId
    const id = new mongoose.Types.ObjectId();
    // create new user
    const newUser = {
      _id: id,
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
        _id: id,
        username: username,
        email: email,
        name: name,
      },
      privateTokenKey,
      { algorithm: "RS256", expiresIn: process.env.EXPIRESIN_TOKEN }
    );

    const refreshToken = jwt.sign(
      {
        _id: id,
        username: username,
        email: email,
        name: name,
      },
      privateRefreshKey,
      { algorithm: "RS256", expiresIn: process.env.EXPIRESIN_REFRESHTOKEN }
    );

    newUser.refreshToken = refreshToken;
    newUser.token = token;
    if (refreshToken && token) {
      await User.create(newUser);
    }
  }

  res.json(newUser);
};
