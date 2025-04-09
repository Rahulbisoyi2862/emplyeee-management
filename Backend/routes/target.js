const express = require("express");
const target = require("../controllers/target");
const getAllTarget = require("../controllers/getAllTarget");
const userTarget = require('../models/userTarget')
const User = require("../models/User")
const router = express.Router();


router.post("/employee/:id", target);

router.get("/get-allTarget", getAllTarget)

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

router.get("/get-storeTarget/:targetCounter", async (req, res) => {
  try {
    let counter = req.params.targetCounter;
    const dateQuery = req.query.date;

    if (!dateQuery) {
      return res.status(400).json({ message: "Date query is required" });
    }

    counter = counter.trim();

    // Monthly filter
    const filter = {
      targetType: "monthly",
      targetCounter: { $regex: `^${counter}$`, $options: "i" },
      date: { $regex: `^${dateQuery}` }
    };

    const userT = await userTarget.find(filter);

    let totalArchive = 0;
    let totalTargetValue = 0;

    if (userT && userT.length > 0) {
      userT.forEach((item) => {
        totalArchive += Number(item.archive) || 0;
        totalTargetValue += Number(item.targetValue) || 0;
      });
    }

    // Yearly data always fetch karna chahiye
    const selectedYear = dateQuery.split("-")[0];
    const yearlyFilter = {
      targetType: "monthly",
      targetCounter: { $regex: `^${counter}$`, $options: "i" },
      date: { $regex: `^${selectedYear}-` }
    };

    const yearlyData = await userTarget.find(yearlyFilter);

    let yearlyArchive = 0;
    let yearlyTarget = 0;

    if (yearlyData && yearlyData.length > 0) {
      yearlyData.forEach((item) => {
        yearlyArchive += Number(item.archive) || 0;
        yearlyTarget += Number(item.targetValue) || 0;
      });
    }

    return res.status(200).json({
      message: "Store Target Summary",
      totalArchive,
      totalTargetValue,
      yearlyArchive,
      yearlyTarget,
      data: userT || []
    });

  } catch (err) {
    console.error("Error in /get-storeTarget/:targetCounter:", err);
    res.status(500).json({ message: "Server Error" });
  }
});




router.get("/get-storeTargetAll", async (req, res) => {
  const dateQuery = req.query.date;

  if (!dateQuery) {
    return res.status(400).json({ message: "Date query is required" });
  }

  let totalMonthlyTarget = 0;
  let totalMonthlyArchive = 0;
  let userT = [];

  // 👇 First, get monthly data (if any)
  const filter = {
    targetType: "monthly",
    date: { $regex: `^${dateQuery}` },
  };

  try {
    userT = await userTarget.find(filter);
    if (userT && userT.length > 0) {
      userT.forEach((item) => {
        totalMonthlyArchive += Number(item.archive) || 0;
        totalMonthlyTarget += Number(item.targetValue) || 0;
      });
    }

    // 👇 Always calculate yearly
    const selectedYear = dateQuery.split("-")[0];
    const yearlyFilter = {
      targetType: "monthly",
      date: { $regex: `^${selectedYear}-` },
    };

    const yearlyData = await userTarget.find(yearlyFilter);

    let totalYearlyTarget = 0;
    let totalYearlyArchive = 0;

    yearlyData.forEach((item) => {
      totalYearlyArchive += Number(item.archive) || 0;
      totalYearlyTarget += Number(item.targetValue) || 0;
    });

    res.status(200).json({
      message: "Store Target Summary",
      totalMonthlyArchive,
      totalMonthlyTarget,
      totalYearlyArchive,
      totalYearlyTarget,
      data: userT,
    });
  } catch (err) {
    console.error("Error in /get-storeTargetAll:", err);
    res.status(500).json({ message: "Server Error" });
  }
});




module.exports = router;