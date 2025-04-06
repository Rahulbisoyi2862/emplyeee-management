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

router.post("/action", async (req,res)=>{
  const { action, id } = req.body;
  console.log("Action Received:", action, "for ID:", id);

  try {
    const updatedLeave = await leave.findByIdAndUpdate(
      id, // yeh MongoDB _id hai
      { $set: { status: action } },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    res.status(200).json({
      message: "Leave status updated successfully",
      updatedLeave,
    });

  } catch (error) {
    console.error("Error updating leave status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;