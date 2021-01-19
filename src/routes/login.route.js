const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login/index.controller");

router.post("/", loginController.index);

router.post("/refreshToken", loginController.refreshToken);

module.exports = router;
