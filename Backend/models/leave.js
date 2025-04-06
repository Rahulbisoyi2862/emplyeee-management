const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
    leaveType: String,
    fromDate: String,
    toDate: String,
    id:String,
    days: Number,
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" } // 🔥 Leave Status
});

module.exports = mongoose.model("leaveStatus", leaveSchema);
