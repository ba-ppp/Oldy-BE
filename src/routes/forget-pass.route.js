const express = require("express");
const router = express.Router();
const forgetController = require("../controllers/forget-pass.controller");

router.get("/", (req, res) => {
  res.sendStatus(200);
});

router.post("/", forgetController.index);

module.exports = router;
