const User = require("../models/User");

const Alluser = async (req, res) => {
    try {
        const users = await User.find({ role: "user" }); // Sirf "user" role wale users fetch honge
        res.json(users); // Response mein sirf filtered users bhejna
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = Alluser;
