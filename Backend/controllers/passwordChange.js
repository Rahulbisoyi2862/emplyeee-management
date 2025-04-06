const User = require("../models/User");
const bcrypt = require("bcrypt");
const validator = require("validator"); // ✅ Validator Import

const passwordChange = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmNewPassword, email } = req.body;

        // ✅ Check if all fields are provided
        if (!oldPassword || !newPassword || !confirmNewPassword || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // ✅ Check if new passwords match
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "New passwords do not match" });
        }

        // ✅ Password should not contain spaces
        if (/\s/.test(newPassword)) {
            return res.status(400).json({ message: "Password should not contain spaces" });
        }

        // ✅ Password should be at least 8 characters
        if (!validator.isLength(newPassword, { min: 8 })) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        // ✅ Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User Not Found" });

        // ✅ Check if old password is correct
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        // ✅ Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // ✅ Save new password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

module.exports = passwordChange;
