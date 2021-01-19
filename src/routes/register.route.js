const express = require("express");
const router = express.Router();
const registerController = require("../controllers/register.controller");

router.get("/", (req, res) => {
  res.sendStatus(200);
});
router.post("/", registerController.index);

module.exports = router;
