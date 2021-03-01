const express = require("express");
const router = express.Router();
const getPostController = require("../controllers/post/getPost.controller");

router.get("/", getPostController.index);

module.exports = router;
