const express = require("express");
const UserTarget = require('../models/userTarget');

const router = express.Router();


router.get('/counter-data/:counter', async (req, res) => {
    try {
        const { counter } = req.params;

        const data = await UserTarget.find({
            counter: counter,
            targetType: "monthly"
        });

        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No data found for this counter' });
        }

        // Return simplified structure
        const formatted = data.map(doc => ({
            counter: doc.counter,
            month: doc.month,
            year: doc.year,
            targetGold: doc.targetGold,
            targetDiamond: doc.targetDiamond,
            archives: doc.archives,
        }));

        res.json(formatted);
    } catch (error) {
        console.error("Error fetching counter data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// GET /api/store-data
router.get("/store-data", async (req, res) => {
    try {
        const counters = await UserTarget.find();

        let totalGoldTarget = 0, totalGoldAchieved = 0;
        let totalDiamondTarget = 0, totalDiamondAchieved = 0;

        counters.forEach(counter => {
            totalGoldTarget += counter.targetGold || 0;
            totalDiamondTarget += counter.targetDiamond || 0;

            counter.archives?.forEach(archive => {
                totalGoldAchieved += archive.archiveGold || 0;
                totalDiamondAchieved += archive.archiveDiamond || 0;
            });
        });

        res.json({
            goldMonthly: { achieved: totalGoldAchieved, target: totalGoldTarget },
            diamondMonthly: { achieved: totalDiamondAchieved, target: totalDiamondTarget },
            goldYearly: { achieved: totalGoldAchieved, target: totalGoldTarget },
            diamondYearly: { achieved: totalDiamondAchieved, target: totalDiamondTarget },
        });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong." });
    }
});

module.exports = router;