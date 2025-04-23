const express = require("express");
const Alluser = require("../controllers/Alluser");
const fullData = require("../controllers/fullData");
const user = require("../models/User")

const router = express.Router();

router.get("/data", Alluser);
router.get("/fullData/:id", fullData);
router.delete("/delete/:id", async (req, res) => {
    const userId = req.params.id;
    console.log(userId, "this is delet id")
    try {
        const deletedUser = await user.findOneAndDelete({ id: userId });

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

})


module.exports = router;
