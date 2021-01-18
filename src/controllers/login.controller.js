const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
module.exports.index = async (req, res) => {
  const email = req.body.email;
  const nonPassword = req.body.password; // password input
  let error = "";
  const user = await User.findOne({ email: email }); // check email is exist
  // if email exist
  if (user) {
    const password = user.password; // password real
    const checkPassword = await bcrypt.compare(nonPassword, password); // check password

    if (checkPassword) {
      // if password correct
    } else {
      error = "Password not correct";
    }
  } else {
    error = "Email not exist";
  }

  res.json(error);
};
