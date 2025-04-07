const User = require("../models/User");
const bcrypt = require("bcrypt");
const validator = require("validator");
const crypto =require("crypto")

const UserCreate = async (req, res) => {
  let {
    phone,
    name,
    email,
    password,
    plBalance,
    clBalance,
    Position,
    role,
  } = req.body;

  const { panCard, adharCard, otherFile } = req.files;

  console.log({
    panCard,
    adharCard,
    otherFile,
    phone,
    name,
    email,
    password,
    plBalance,
    clBalance,
    Position,
    role,
  });

  if (!phone || !name || !email || !password || !panCard || !adharCard || !otherFile) {
    return res.status(400).json({ message: "All fields are required" });
  }

  email = email.toLowerCase().trim();

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (/\s/.test(email)) {
    return res.status(400).json({ message: "Email should not contain spaces" });
  }

  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: "Invalid phone number format" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters long" });
  }

  if (/\s/.test(password)) {
    return res.status(400).json({ message: "Password should not contain spaces" });
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or phone already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const plnumber = parseFloat(plBalance) || 0;
    const clnumber = parseFloat(clBalance) || 0;
    const id=crypto.randomInt(10000,99999)
    const newUser = new User({
      phone,
      name,
      email,
      id,
      panCard: panCard ? panCard[0].filename : null,
      adharCard: adharCard ? adharCard[0].filename : null,
      otherFile: otherFile ? otherFile.map(f => f.filename) : [],
      password: hashedPassword,
      plBalance: plnumber,
      clBalance: clnumber,
      Position,
      role: role || "user",
    });

    await newUser.save();

    return res.status(200).json({ message: "User Created Successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Server error, please try again later" });
  }
};

module.exports = UserCreate;
