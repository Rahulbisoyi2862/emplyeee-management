const mongoose = require("mongoose");

const userTargetSchema = new mongoose.Schema({
    targetType:String, 
    targetValue:String,
    archive:Number,
    date:String,
    email:String,
});

module.exports = mongoose.model("userTarget", userTargetSchema);
