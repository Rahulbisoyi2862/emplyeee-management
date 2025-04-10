const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  profileImg: String,
  role: { type: String, enum: ["user", "subadmin", "admin"], default: "user" },
  phone: String,
  name: String,
  panCard: String,
  adharCard: String,
  otherFile: {
    type: [String]
  },
  id: Number,
  plBalance: Number,
  clBalance: Number,
  totalPl: Number, // ✅ Total Privilege Leave (no default)
  totalCl: Number, // ✅ Total Casual Leave (no default)
  Position: String,
});

module.exports = mongoose.model("User", userSchema);
