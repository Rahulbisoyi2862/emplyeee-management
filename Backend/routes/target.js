const express = require("express");
const target = require("../controllers/target");
const getAllTarget = require("../controllers/getAllTarget");
const userTarget=require('../models/userTarget')
const User=require("../models/User")
const router = express.Router();


router.post("/employee",target);
router.get("/get-allTarget",getAllTarget)
router.get("/topThree", async (req, res) => {
    try {
      // Pehle top 3 employees find karo
      const topEmployees = await userTarget.find({})
        .sort({ archive: -1 })
        .limit(3);
  
      // Ab inka name find karo `User` model se
      const employeesWithName = await Promise.all(
        topEmployees.map(async (employee) => {
          const user = await User.findOne({ email: employee.email }); // ✅ Email se User find karo
          return {
            _id: employee._id,
            email: employee.email,
            archive: employee.archive,
            name: user ? user.name : "Unknown", // ✅ User mila toh name, nahi toh "Unknown"
          };
        })
      );
  
    //   console.log("Top Employees with Names:", employeesWithName); // Debugging
      res.status(200).json(employeesWithName); // ✅ JSON Response
    } catch (error) {
      console.error("❌ Error fetching top employees:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
module.exports = router;