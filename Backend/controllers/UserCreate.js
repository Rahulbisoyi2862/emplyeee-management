const User = require("../models/User");
const bcrypt = require("bcrypt");
const validator = require("validator"); // For email validation

const UserCreate = async (req, res) => {
    let {
        phone,
        name,
        email,
        panCard,
        adharCard,
        password,
        plBalance,
        clBalance,
        Position,
        id, // ✅ ID ko yaha se extract karna zaroori hai
    } = req.body;

    // ✅ Convert email to lowercase
    email = email.toLowerCase();

    // Check if any required fields are missing
    if (!phone || !name || !email || !password || !id) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ ID validation: Sirf 5 digits allowed (no more, no less)
    const idRegex = /^\d{5}$/; // ✅ Only exactly 5 digits
    if (!idRegex.test(id)) {
        return res.status(400).json({ message: "ID must be exactly 5 digits long" });
    }

    // Validate Email format and check for spaces
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    if (/\s/.test(email)) {
        return res.status(400).json({ message: "Email should not contain spaces" });
    }

    // Validate Phone number format (Example: basic Indian phone number validation)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: "Invalid phone number format" });
    }

    // Validate password strength and check for spaces
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }
    if (/\s/.test(password)) {
        return res.status(400).json({ message: "Password should not contain spaces" });
    }

    try {
        // Check if the email, phone number, or ID already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { phone }, { id }], // ✅ Ensure unique ID
        });

        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User with this email, phone, or ID already exists" });
        }

        // Hash the password
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
            if (err) {
                console.error("Error hashing password:", err);
                return res.status(500).json({ message: "Error processing password" });
            }

            const plnumber=parseFloat(plBalance)
            const clnumber=parseFloat(clBalance)
            // Create the new user
            await User.create({
                phone,
                name,
                email,
                panCard,
                adharCard,
                password: hashedPassword,
                id, // ✅ ID ko save karna zaroori hai
                plBalance:plnumber,
                clBalance:clnumber,
                Position,
                role: "user",
            });

            return res.status(200).json({ message: "User Created Successfully" });
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Server error, please try again later" });
    }
};

module.exports = UserCreate;
