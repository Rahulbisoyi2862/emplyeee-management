const express = require("express");
const authController=require('../controllers/authController');
const verifyToken = require("../middleware/verifyToken");
const userVerfyToken = require("../middleware/userVerfyToken");
const User=require("../models/User")
const userTarget=require("../models/userTarget")
const router = express.Router();

router.post("/login",authController);

router.get("/logout/user",(req,res)=>{
  res.clearCookie('tokenUser');  
 return res.status(200).send('Logged out successfully');
})

router.get("/logout/admin",(req,res)=>{
  res.clearCookie('token');  
 return res.status(200).send('Logged out successfully');
})

router.get("/admin",verifyToken,(req,res)=>{
  return  res.json({ message: "Welcome!", user: req.user });
})
router.get("/user",userVerfyToken, async (req,res)=>{
const user=await User.findOne({_id:req.user.id})

const usertarget=await userTarget.findOne({id:user.id})
console.log(userTarget)
  return  res.json({ message: "Welcome! userpage", user: user ,target:usertarget});

})

module.exports = router;


