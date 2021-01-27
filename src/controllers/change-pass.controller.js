const User = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports.index = async (req, res) => {
  const password = req.body.password;
  const id = req.body.id;

  const hash = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS_BCRYPT)
  );
  await User.findByIdAndUpdate(id, { password: hash });
  res.json({ message: "success" });
};
