const User = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports.index = async (req, res) => {
  const password = req.body.password;
  const id = req.body.id;
  const result = {
    errorCode : 0,
    error: ''
  };
  let user = await User.findOne({ _id: id });
  if (!user){
    result.errorCode = 1;
    result.error = 'User not exist';
    res.json(result);
  }
  const hash = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS_BCRYPT)
  );
  await User.findByIdAndUpdate(id, { password: hash });
  res.json({ errorCode: 1 });
};
