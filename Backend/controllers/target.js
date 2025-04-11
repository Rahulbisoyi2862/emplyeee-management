const User = require("../models/User"); // Import User model
const UserTarget = require("../models/userTarget");

const target = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const { targetType, targetGold, targetDiamond, counter, month, year } = req.body;

        // Validation
        if (!targetType || !targetGold || !targetDiamond || !counter || !month || !year) {
            return res.status(400).json({ error: "Please fill in all fields." });
        }

        // Get user name from User model
        const user = await User.findOne({ id: employeeId });
        if (!user) return res.status(400).json({ message: "User not found." });

        // Generate current date in MM-DD-YY format
        const now = new Date();
        const formattedDate = now.toLocaleDateString("en-US", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit"
        }); // e.g., "04/12/25"

        const formattedDateWithHyphen = formattedDate.replace(/\//g, "-"); // "04-12-25"

        // Create new target object
        const newTarget = new UserTarget({
            name: user.name,
            id: employeeId,
            targetType,
            targetGold,
            targetDiamond,
            counter,
            month, // 👈 Store as received (e.g., "04")
            year,  // 👈 Store as received (e.g., "2025")
            date: formattedDateWithHyphen, // 👈 Save current date as "MM-DD-YY"
        });

        await newTarget.save();
        res.status(201).json({ message: "Target created successfully." });

    } catch (error) {
        console.error("Error creating target:", error);
        res.status(500).json({ error: "Server error while creating target." });
    }
};

module.exports = target;
