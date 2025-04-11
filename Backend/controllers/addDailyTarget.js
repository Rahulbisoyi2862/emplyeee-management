const userTarget = require("../models/userTarget");

const addDailyTarget = async (req, res) => {
  const { gold, diamond, date } = req.body;

  try {
    const target = await userTarget.findById(req.params.id);

    if (!target) {
      return res.status(404).json({ success: false, message: "Target not found" });
    }

    // ✅ Add to archive totals
    target.archiveGold += Number(gold);
    target.archiveDiamond += Number(diamond);

    // ✅ Push to archive array
    target.archives.push({
      date,
      archiveGold: Number(gold),
      archiveDiamond: Number(diamond),
    });

    await target.save();

    res.json({ success: true, message: "Progress added successfully" });
  } catch (err) {
    console.error("Add Progress Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = addDailyTarget;
