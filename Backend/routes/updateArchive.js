const express = require("express");
const updateArchive = require("../controllers/updateArchive");
const addDailyTarget = require("../controllers/addDailyTarget");
const getChartData = require("../controllers/getChartData");


const router = express.Router();


router.post("/update-archive/:id", updateArchive);
router.post("/add-daily-target/:id",addDailyTarget);
router.get("/chart-data/:id", getChartData);

module.exports = router;
  