const express = require("express");
const router = express.Router();
const getPostController = require("../controllers/post/getPost.controller");
const likePostController = require("../controllers/post/likePost.controller");

router.post("/", getPostController.index);

router.post("/like", likePostController.index);

module.exports = router;
