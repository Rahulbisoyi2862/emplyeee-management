const mongoose = require("mongoose");

const googleSheetUrl= new mongoose.Schema({
    googleSheetUrl:String,
});

module.exports = mongoose.model("googleSheetUrl", googleSheetUrl);
