const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: String,
  caption: String,
  image: String,
  likes: Array,
  comments: Object,
});

const Posts = mongoose.model("Posts", postSchema, "posts");

module.exports = Posts;