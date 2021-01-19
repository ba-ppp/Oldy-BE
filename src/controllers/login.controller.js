const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

module.exports.index = async (req, res) => {
  const email = req.body.email;
  const nonPassword = req.body.password; // password input

  let result = {
    error: "",
    isLogin: false,
  };
  const user = await User.findOne({ email: email }); // check email is exist
  // if email exist
  if (user) {
    const password = user.password; // password real

    const checkPassword = await bcrypt.compare(nonPassword, password); // check password

    if (checkPassword) {
      // if password correct
      //keys
      const privateTokenKey = fs.readFileSync(
        path.resolve(__dirname, "../controllers/keys/privateToken.key")
      );
      const privateRefreshKey = fs.readFileSync(
        path.resolve(__dirname, "../controllers/keys/privateRefresh.key")
      );

      //token
      const token = jwt.sign(
        {
          _id: user._id,
          email: user.email,
        },
        privateTokenKey,
        { algorithm: "RS256", expiresIn: process.env.EXPIRESIN_TOKEN }
      );

      const refreshToken = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        privateRefreshKey,
        { algorithm: "RS256", expiresIn: process.env.EXPIRESIN_TOKEN }
      );

      result.refreshToken = refreshToken;
      result.token = token;
      result.isLogin = true;

      // save refreshToken to user's db
      await User.updateOne({ email: email }, { refreshToken: refreshToken });
    } else {
      result.error = "Password not correct";
    }
  } else {
    result.error = "Email not exist";
  }

  res.json(result);
};
