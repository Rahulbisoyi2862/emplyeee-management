const User = require("../models/User")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
dotenv.config()
const authController = async (req, res, next) => {
  const { email, password } = req.body
  console.log(email, password)
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });



  const isAdmin = user.role === 'admin';
  if (!isAdmin) {
    const tokenUser = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "2h" });
    res.cookie("tokenUser", tokenUser, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 2 * 60 * 60 * 1000,
    });
    return res.status(403).json({ message: "Access denied admin navigate you emplee page" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "2h" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 2 * 60 * 60 * 1000,
  });

  res.status(200).json({ message: "✅ Login successful!", token, role: user.role });
}
module.exports = authController



// const saltRounds = 10;  // Kitni baar hash hoga

// bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
//   if (err) {
//     console.error("Error hashing password:", err);
//   } else {
//     console.log("Hashed Password:", hashedPassword);
//     User.create({
//         email,
//         password:hashedPassword,
//         role:"admin"
//     })
//   }
// });