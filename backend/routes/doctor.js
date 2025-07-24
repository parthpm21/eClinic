const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

// Add a doctor
router.post("/add", async (req, res) => {
  const { name, specialty, availableDays, availableTime } = req.body;
  try {
    const doctor = new Doctor({ name, specialty, availableDays, availableTime });
    await doctor.save();
    res.json({ success: true, message: "Doctor added successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Get all doctors
router.get("/all", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json({ success: true, doctors });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

module.exports = router;
