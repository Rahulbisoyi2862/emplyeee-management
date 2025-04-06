const User = require("../models/User");

const fullData = async (req, res) => {
    try {
        const id = req.params.id;  
        
        const users = await User.findOne({ id }); // Sirf "user" role wale users fetch honge
        res.json(users); // Response mein sirf filtered users bhejna
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = fullData;