const express = require("express");
const updateArchive = require("../controllers/updateArchive");


const router = express.Router();

router.post("/update-archive/:id",updateArchive)


module.exports = router;
  