const express = require("express");
const router = express.Router();
const changeProfileController = require("../controllers/profile/change-profile.controller");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get("/change-profile", (req, res) => {
  res.sendStatus(200);
});

router.get("/change-avt", (req, res) => {
  res.sendStatus(200);
});

router.post("/change-profile", changeProfileController.index);

router.post("/change-avt", changeProfileController.changeAvt);

module.exports = router;
