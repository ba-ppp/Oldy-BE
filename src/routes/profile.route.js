const express = require("express");
const router = express.Router();
const changeProfileController = require("../controllers/profile/change-profile.controller");

router.get("/change-profile", (req, res) => {
  res.sendStatus(200);
});

router.post("/change-profile", changeProfileController.index);

module.exports = router;
