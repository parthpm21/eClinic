// const express = require("express");
// const router = express.Router();
// const Appointment = require("../models/Appointment");
// const Doctor = require("../models/Doctor");

// // Book an appointment
// router.post("/book", async (req, res) => {
//   const { patientName, doctorId, appointmentDate, appointmentTime } = req.body;
//   try {
//     const appointment = new Appointment({ patientName, doctorId, appointmentDate, appointmentTime });
//     await appointment.save();
//     res.json({ success: true, message: "Appointment booked successfully" });
//   } catch (err) {
//     res.json({ success: false, message: err.message });
//   }
// });

// // Get all appointments (optional)
// router.get("/all", async (req, res) => {
//   try {
//     const appointments = await Appointment.find().populate("doctorId", "name specialty");
//     res.json({ success: true, appointments });
//   } catch (err) {
//     res.json({ success: false, message: err.message });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const authMiddleware = require("../middleware/authMiddleware");

// Book an appointment (only if logged in)
router.post("/book", authMiddleware, async (req, res) => {
  const { patientName, doctorId, appointmentDate, appointmentTime } = req.body;

  try {
    const appointment = new Appointment({
      patientName,
      doctorId,
      appointmentDate,
      appointmentTime,
      userId: req.userId // from JWT token
    });

    await appointment.save();
    res.json({ success: true, message: "Appointment booked successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// View my own appointments
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.userId }).populate("doctorId", "name specialty");
    res.json({ success: true, appointments });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Update doctor's availability
router.post("/availability", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const { availability } = req.body;

    await User.findByIdAndUpdate(req.user.userId, { availability });
    res.json({ success: true, message: "Availability updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get appointments assigned to a doctor
router.get("/doctor", authMiddleware, async (req, res) => {
  if (req.user.role !== "doctor") {
    return res.status(403).json({ success: false, message: "Access denied" });
  }

  try {
    const appointments = await Appointment.find({ doctorId: req.user.userId }).populate("patientId");
    res.json({ success: true, appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


module.exports = router;
