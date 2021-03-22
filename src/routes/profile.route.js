const express = require("express");
const router = express.Router();
const changeProfileController = require("../controllers/profile/change-profile.controller");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }).single('avt');

router.get("/change-profile", (req, res) => {
  res.sendStatus(200);
});

router.get("/change-avt", (req, res) => {
  res.sendStatus(200);
});

router.post("/change-profile", changeProfileController.index);

router.post("/change-avt", function(req, res) {
     
  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
    return res.json({
      file: req.file
    })

  })
});

module.exports = router;
