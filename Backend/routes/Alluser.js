const express = require("express");
const Alluser = require("../controllers/Alluser");
const fullData = require("../controllers/fullData");

const router = express.Router();

router.get("/data",Alluser);
router.get("/fullData/:id",fullData);


module.exports = router;
