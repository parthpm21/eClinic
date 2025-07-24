const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor"
  },
  appointmentDate: String,
  appointmentTime: String,
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
