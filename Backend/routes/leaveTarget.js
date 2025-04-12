const express = require("express");
const leaveTarget = require("../controllers/leaveTarget");
const User = require("../models/User");
const leave = require("../models/leave");
const router = express.Router();


router.post("/status",leaveTarget);

router.get("/id/get/:id", async (req,res)=>{
    try {
        const userId = req.params.id;
        console.log("Fetching leave data for user:", userId);
    
        const userT = await leave.find({ id:userId });
        console.log("User Leaves:", userT);
    
        res.status(200).json({ userT });
      } catch (error) {
        console.error("Error fetching leave data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    
})

router.get("/allData", async (req,res)=>{
  try {
      const userT = await leave.find();
      console.log("User Leaves:", userT);
      if(!userT) return res.status(400).json({message:"not Avilebule leaves request"})
  
      res.status(200).json({ userT:userT });
    } catch (error) {
      console.error("Error fetching leave data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  
})

router.post("/action", async (req, res) => {
  const { action, id } = req.body;
  console.log("Action Received:", action, "for ID:", id);

  try {
    const updatedLeave = await leave.findByIdAndUpdate(
      id, // Yeh MongoDB _id hai
      { $set: { status: action } },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    // Leave status update hone par, user ki leave details ko update karna
    const user = await User.findOne({ id: updatedLeave.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (updatedLeave.status === "approved") {
      if (updatedLeave.leaveType === "PL") {
        // PL ki leave approve hone par, plBalance ko update karo
        user.plBalance -= updatedLeave.days;
        // **totalPl ko update mat karo** bas plBalance ko update karo
      } else if (updatedLeave.leaveType === "CL") {
        // CL ki leave approve hone par, clBalance ko update karo
        user.clBalance -= updatedLeave.days;
        // **totalCl ko update mat karo** bas clBalance ko update karo
      }

      await user.save(); // User ki details save karna
    }

    console.log("Updated PL Balance:", user.plBalance);
    console.log("Updated CL Balance:", user.clBalance);

    res.status(200).json({
      message: "Leave status updated successfully",
      updatedLeave,
      user,
    });
  } catch (error) {
    console.error("Error updating leave status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;