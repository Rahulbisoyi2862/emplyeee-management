const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" }, // Default role "user"
  phone: String,
  name: String,
  panCard: String,
  adharCard: String,
  password: String,
  id:String,
  plBalance: Number,
  clBalance: Number,
  Position: String,
});

module.exports = mongoose.model("User", userSchema);
