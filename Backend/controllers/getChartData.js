const Target = require("../models/userTarget");
const User=require("../models/User")
const getChartData = async (req, res) => {
  try {
    const userTarget = await Target.findById(req.params.id);
    if (!userTarget) return res.json({ success: false, message: "Target not found" });
    
    const user=await User.findById(req.params.id)

    
    

    const chartData = [
      {
        month: userTarget.month,
        year: userTarget.year,
        gold: userTarget.targetGold,
        diamond: userTarget.targetDiamond,
        archiveGold: userTarget.archives.reduce((sum, a) => sum + (a.archiveGold || 0), 0),
        archiveDiamond: userTarget.archives.reduce((sum, a) => sum + (a.archiveDiamond || 0), 0),
        archives: userTarget.archives, // ✅ THIS IS IMPORTANT
      },
    ];

    return res.json({ success: true, data: chartData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = getChartData;
