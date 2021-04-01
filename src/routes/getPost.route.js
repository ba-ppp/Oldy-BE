const express = require("express");
const router = express.Router();
const getPostController = require("../controllers/post/getPost.controller");
const likePostController = require("../controllers/post/likePost.controller");
const upPostController = require("../controllers/post/upPost.controller");

router.post("/", getPostController.index);

router.post("/like", likePostController.index);

router.post("/upload", upPostController.index);

module.exports = router;
