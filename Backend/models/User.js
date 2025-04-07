const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  profileImg:String,
  role: { type: String, enum: ["user","subadmin","admin"], default: "user" }, // Default role "user"
  phone: String,
  name: String,
  panCard: String,
  adharCard: String,
  otherFile:{
    type: [String]
  },
  password: String,
  id:Number,
  plBalance: Number,
  clBalance: Number,
  Position: String,
});

module.exports = mongoose.model("User", userSchema);
