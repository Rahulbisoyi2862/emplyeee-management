
const userTarget = require("../models/userTarget")

const getAllTarget = async (req, res) => {
    try {
        const userT = await userTarget.find();

        const formattedTargets = userT.map(target => ({
            ...target.toObject(),
            date: new Date(target.date).toLocaleDateString("en-CA") // ✅ Converts to "YYYY-MM-DD"
        }));

        res.json({ success: true, targets: formattedTargets });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

module.exports = getAllTarget