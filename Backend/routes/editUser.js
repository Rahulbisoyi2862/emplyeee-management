const express = require("express");
const editUser = require("../controllers/editUser");
const upload = require("../config/multer");  // Import the multer configuration

const router = express.Router();

// Define the edit user route with multer file upload handling
router.post("/edit/:id", upload.fields([  // Handles multiple fields (panCard, adharCard, otherFile)
  { name: 'panCard', maxCount: 1 },  // Only one file for panCard
  { name: 'adharCard', maxCount: 1 },  // Only one file for adharCard
  { name: 'otherFile', maxCount: 10 }  // Multiple files allowed for otherFile (10 max)
]), editUser);  // The controller that handles the update logic

module.exports = router;
