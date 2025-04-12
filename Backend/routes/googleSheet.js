const express = require("express");
const googleSheetUrl = require('../models/GoogleSheet');

const router = express.Router();

router.post("/sheet", async (req, res) => {
    const { sheetUrl } = req.body;

    // Validation: Check if sheetUrl is provided
    if (!sheetUrl) {
        return res.status(400).json({ message: "Sheet URL is required" });
    }

    try {
        // If you want to update a specific sheet URL, use findOne or findById
        const url = await googleSheetUrl.findOne();  // Find a document (first one)

        if (!url) {
            // If no document is found, create a new one
            const newUrl = new googleSheetUrl({
                googleSheetUrl: sheetUrl
            });
            await newUrl.save();
            return res.status(200).json({ message: "New sheet URL stored successfully" });
        }

        // If a document is found, update it
        url.googleSheetUrl = sheetUrl;
        await url.save();

        // Respond with success message
        res.status(200).json({ message: "Sheet URL updated successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;


router.get("/get", async (req,res)=>{
   const url= await googleSheetUrl.find({})
   if(!url) return res.status(400).json({message:"google sheet url not funds"})
    res.status(200).json({message:url})
})

module.exports = router;