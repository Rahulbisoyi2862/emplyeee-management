const mongoose = require("mongoose");

const archiveSchema = new mongoose.Schema({
  date: String,
  archiveGold: {type:Number,default:0},
  archiveDiamond: {type:Number,default:0},
}, { _id: false }); // prevent Mongo from making extra _id for each entry

const userTargetSchema = new mongoose.Schema({
  name:String,
  id: String,
  targetType: String,
  targetGold: Number,
  targetDiamond: Number,
  counter: String,

  archives: [archiveSchema], // ✅ new field
  month: String,
  year: String,
  date:String,
}, { timestamps: true });

module.exports = mongoose.model("userTarget", userTargetSchema);
