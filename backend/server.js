const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const doctorRoutes = require("./routes/doctor");
const appointmentRoutes = require("./routes/appointment");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "https://apna-clinic-phi.vercel.app",
  "https://apna-clinic-k38wmj95p-parthpm21s-projects.vercel.app"
];

// ✅ CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// ✅ Preflight handling
app.options("*", cors());

// ✅ JSON parser
app.use(express.json());

console.log("Mongo URI:", process.env.MONGO_URI);

// ✅ DB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("DB error:", err));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Doctor Appointment Backend is running.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
