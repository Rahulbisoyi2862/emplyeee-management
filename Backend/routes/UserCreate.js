const express = require("express");
const UserCreate =require("../controllers/UserCreate")

const router = express.Router();

router.post("/create",UserCreate);


module.exports = router;
