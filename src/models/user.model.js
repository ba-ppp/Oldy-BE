const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  postId: Array,
  avt: String,
  username: String,
  refreshToken: String,
});

const Users = mongoose.model("Users", userSchema, "users");

module.exports = Users;
