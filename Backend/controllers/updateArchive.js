// controllers/updateArchive.js
const userTarget = require("../models/userTarget");

const updateArchive = async (req, res) => {
  try {
    const { archive, type } = req.body;
    const id = req.params.id;

    const user = await userTarget.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (isNaN(archive)) {
      return res.status(400).json({ success: false, message: "Archive must be a number" });
    }

    user.archive = parseFloat(archive);
    user.targetType = type;
    await user.save();

    res.status(200).json({ success: true, message: "Archive updated", updatedArchive: user.archive });
  } catch (err) {
    console.error("Update Archive Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = updateArchive;
