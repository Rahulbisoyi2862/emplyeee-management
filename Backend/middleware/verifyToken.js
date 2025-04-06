const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const verifyToken = (req, res, next) => {
    console.log('middle ware ke pass aya')

    const token = req.cookies.token; // 🍪 Get token from cookies

    if (!token) return res.status(401).json({ message: "Access Denied! No token found" });

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified; // ✅ Set user data in req.user
        
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = verifyToken
