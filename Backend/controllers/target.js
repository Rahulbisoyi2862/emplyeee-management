const userTarget = require("../models/userTarget");
const User = require("../models/User"); // Import User model

const target = async (req, res) => {
    try {
        const { targetType,targetValue,date,counter} = req.body;
        const id=req.params.id
       
         console.log(targetType)
        // ✅ Check if Email Exists in User Model
        const user = await User.findOne({ id });
        if (!user) {
            return res.status(404).json({ error: "⚠️ User not found!" });
        }

        // ✅ Block Admin Emails
        if (user.role === "admin") {
            return res.status(403).json({ error: "❌ Admin cannot have targets!" });
        }

        // ✅ Validation Checks
        if (!targetType || !targetValue || !date || !id ||!counter) {
            return res.status(400).json({ error: "⚠️ All fields are required!" });
        }
        if (!["yearly", "monthly"].includes(targetType)) {
            return res.status(400).json({ error: "⚠️ Invalid target type! Choose 'yearly' or 'monthly'." });
        }
        if (isNaN(targetValue) || targetValue <= 0) {
            return res.status(400).json({ error: "⚠️ Target value must be a positive number!" });
        }

        // ✅ Convert to local date & time
        // const localDate = new Date(date).toLocaleString("en-IN", {
        //     timeZone: "Asia/Kolkata",
        //     year: "numeric",
        //     month: "2-digit",
        //     day: "2-digit",
        //     hour: "2-digit",
        //     minute: "2-digit",
        //     second: "2-digit",
        // });

        const localDate = new Date(date).toLocaleDateString("en-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

        
        const targetNumber = parseFloat(targetValue);

        // ✅ Save to Database
        const userTargetData = await userTarget.create({
            targetType,
            targetValue:targetNumber,
            targetCounter:counter,
            date: localDate, // Store Local Date
            id,
        });

        res.json({ message: "✅ Target added successfully!", target: userTargetData });
    } catch (error) {
        console.error("❌ Error adding target:", error);
        res.status(500).json({ error: "⚠️ Internal Server Error" });
    }
  
};

module.exports = target;
