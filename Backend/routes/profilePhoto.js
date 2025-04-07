const express = require("express");
const profilePhoto = require("../controllers/profilePhoto");
const upload = require("../config/multer");

const router = express.Router();

router.post("/profile",upload.single("imageProfile"),profilePhoto)


module.exports = router;
  