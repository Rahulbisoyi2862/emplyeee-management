const mongoose = require("mongoose");

const userTargetSchema = new mongoose.Schema({
    id: String,
    targetType: String,
    targetValue: Number,
    targetCounter: String,
    archive: { type: Number, default: 0 },
    date: String,
},{ timestamps: true })

module.exports = mongoose.model("userTarget", userTargetSchema);
