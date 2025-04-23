const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, role, password, pl, cl, position } = req.body;
        const files = req.files;

        // 1. Check all text fields are present
        if (!name || !email || !phone || !role || !password || !position) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // 2. Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        // 3. Validate phone
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: "Invalid phone number. Must be 10 digits." });
        }

        // 4. Validate password
        if (password.trim() === "") {
            return res.status(400).json({ message: "Password cannot be empty or only spaces." });
        }
        if (/\s/.test(password)) {
            return res.status(400).json({ message: "Password should not contain spaces." });
        }
        if (password.length !== 8) {
            return res.status(400).json({ message: "Password must be exactly 8 characters." });
        }

        // 5. Validate file uploads
        if (!files?.panCard || files.panCard.length === 0) {
            return res.status(400).json({ message: "PAN Card file is required." });
        }
        if (!files?.adharCard || files.adharCard.length === 0) {
            return res.status(400).json({ message: "Aadhar Card file is required." });
        }
        if (!files?.otherFile || files.otherFile.length === 0) {
            return res.status(400).json({ message: "At least one 'Other Document' file is required." });
        }

        // 6. Find existing user
        const user = await User.findOne({ id: id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 7. Check for duplicate email/phone
        const duplicate = await User.findOne({
            $or: [{ email }, { phone }],
            _id: { $ne: user._id }
        });

        if (duplicate) {
            return res.status(400).json({ message: "Email or phone number already in use by another user." });
        }

        // 8. Update user fields
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.role = role;
        user.position = position;
        user.plBalance = pl;
        user.clBalance = cl;
        user.password = await bcrypt.hash(password, 10);

        // 9. Update file paths
        user.panCard = files.panCard[0].filename;
        user.adharCard = files.adharCard[0].filename;
        user.otherFile = files.otherFile.map(file => file.filename);

        await user.save();
        res.status(200).json({ message: "User updated successfully!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error occurred while updating the user.", error });
    }
};

module.exports = editUser;
