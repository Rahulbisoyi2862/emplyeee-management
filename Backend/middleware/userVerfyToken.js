const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const userVerfyToken = (req, res, next) => {
    console.log('middle ware userVerfy ke pass aya')

    const token = req.cookies.tokenUser; // 🍪 Get token from cookies

    if (!token) return res.status(401).json({ message: "Access Denied! No token found" });

    try {
        const verifiedUser = jwt.verify(token,process.env.SECRET_KEY);
        req.user = verifiedUser; // ✅ Set user data in req.user
        next();
     
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = userVerfyToken
