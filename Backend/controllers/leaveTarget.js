const leave = require("../models/leave");
const User = require("../models/User");

const leaveTarget = async (req, res) => {
  const { leaveType, fromDate, toDate, days, updatedCl, id, updatedPl } = req.body;

  // ✅ Simple Validation
  if (!id || !leaveType || !fromDate || !toDate || !days) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (leaveType !== "CL" && leaveType !== "PL") {
    return res.status(400).json({ message: "Invalid leave type." });
  }

  const nDays = parseFloat(days);
  if (isNaN(nDays) || nDays <= 0) {
    return res.status(400).json({ message: "Days must be a valid number greater than 0." });
  }

  if (isNaN(updatedCl) || isNaN(updatedPl)) {
    return res.status(400).json({ message: "Invalid leave balance values." });
  }

  // ✅ User find & leave save
  try {
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    user.clBalance = updatedCl;
    user.plBalance = updatedPl;
    await user.save();

    const lev = await leave.create({
      leaveType,
      fromDate,
      id,
      toDate,
      days: nDays,
      status: "pending",
    });

    return res.status(200).json({ leaves: lev });
  } catch (err) {
    console.error("Leave apply error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = leaveTarget;
