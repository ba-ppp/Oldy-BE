const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login/index.controller");

router.get("/refreshToken", (req, res) => {
  res.sendStatus(200);
});
router.post("/refreshToken", loginController.refreshToken);

router.get("/", (req, res) => {
  res.sendStatus(200);
});
router.post("/", loginController.index);

module.exports = router;
