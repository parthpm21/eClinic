const express = require("express");
const router = express.Router();
const User = require("../models/userModel"); // Assuming 'User' model handles doctors

// GET all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Failed to load doctors", error: error.message });
  }
});

module.exports = router;
