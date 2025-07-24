const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  availableDays: [String],   // ["Monday", "Wednesday"]
  availableTime: String      // "10:00 AM - 5:00 PM"
});

module.exports = mongoose.model("Doctor", doctorSchema);
