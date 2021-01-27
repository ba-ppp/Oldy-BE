const express = require("express");
const router = express.Router();
const changePassController = require("../controllers/change-pass.controller");

router.get("/", (req, res) => {
  res.sendStatus(200);
});

router.post("/", changePassController.index);

module.exports = router;
