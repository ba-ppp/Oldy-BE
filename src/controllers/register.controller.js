const User = require("../models/user.model");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const saltRounds = 10;

module.exports.index = async (req, res) => {
  const result = {};
  const email = req.body.email; // email input
  const password = req.body.password; // password input
  const username = req.body.username;

  const checkExist = await User.findOne({ email: email });
  if (checkExist) {
    // if email is registered
    result.error = "Email exist";
  } else {
    const newUser = {
      email: email,
      password: "",
      postId: [],
      avt: "",
      username: username,
      refreshToken: "",
    };

    // hash password
    bcrypt.hash(password, saltRounds, function (err, hash) {
      newUser.password = hash;
    });
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
      result.token = token;
      result.isRegister = true;
      await User.create(newUser);
    } else {
      result.isRegister = false;
    }
  }
  res.json(result);
};
