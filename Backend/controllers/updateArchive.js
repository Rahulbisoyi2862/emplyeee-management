const userTarget = require("../models/userTarget");

const updateArchive = async (req, res) => {
    try {
        const { archive, type } = req.body; // Frontend se archive data
        const id = req.params.id; // Email from URL

        // User exist karta hai ya nahi?
        const user = await userTarget.findOne({ _id:id });
        console.log(type)
        console.log(user)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if (isNaN(archive)) {
            return res.status(400).json({ error: "⚠️ Archive value must be a valid number!" });
        }

        const archiveNumber = parseFloat(archive);
        // Archive update karo
        user.archive = archiveNumber;
        await user.save();
        user.targetType = type
        await user.save()

        

        res.status(200).json({ message: "Archive updated successfully", updatedArchive: user.archive });
    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

module.exports = updateArchive;
