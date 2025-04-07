const express = require("express");
const UserCreate =require("../controllers/UserCreate")
const upload =require("../config/multer")
const router = express.Router();

router.post(
    "/create",
    upload.fields([
      { name: "panCard", maxCount: 1 },
      { name: "adharCard", maxCount: 1 },
      { name: "otherFile", maxCount: 10 }
    ]),
    UserCreate
  );


module.exports = router;
