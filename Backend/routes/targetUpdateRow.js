// routes/target.js ya jahan bhi tu bana raha
const express = require("express");
const router = express.Router();
const Target = require("../models/userTarget"); // model path adjust kar

// POST route to add archive entry
// PUT /api/target/edit-archive/:id
router.put("/edit-archive/:id", async (req, res) => {
  const { index, updatedData } = req.body;

  const target = await Target.findById(req.params.id);
  if (!target) return res.status(404).json({ success: false, msg: "Target not found" });

  if (!target.archives[index]) return res.status(400).json({ success: false, msg: "Invalid index" });

  target.archives[index] = updatedData;

  await target.save();
  res.json({ success: true, msg: "Archive updated successfully" });
});
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await Target.findByIdAndDelete(id);
  res.json({ success: !!deleted });
})

module.exports = router;
