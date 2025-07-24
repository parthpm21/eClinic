const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor"
  },
  appointmentDate: String, // e.g., "2025-07-24"
  appointmentTime: String  // e.g., "2:30 PM"
});

module.exports = mongoose.model("Appointment", appointmentSchema);
