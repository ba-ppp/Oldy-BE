const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: String,
  email: String,
  password: String,
  postId: Array,
  avt: String,
  refreshToken: String,
});

const Users = mongoose.model("Users", userSchema, "users");

module.exports = Users;
