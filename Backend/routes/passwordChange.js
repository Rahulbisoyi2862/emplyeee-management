const express = require("express");
const passwordChange = require("../controllers/passwordChange");


const router = express.Router();

router.post("/change",passwordChange)


module.exports = router;
