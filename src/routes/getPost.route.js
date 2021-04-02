const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const getPostController = require("../controllers/post/getPost.controller");
const likePostController = require("../controllers/post/likePost.controller");
const upPostController = require("../controllers/post/upPost.controller");
const uploadImageController = require("../controllers/post/uploadImage.controller");

router.post("/", getPostController.index);

router.post("/like", likePostController.index);

router.post("/upload", upPostController.index);

router.post("/image", upload.single('image'), uploadImageController.index);

module.exports = router;
