const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const doctorRoutes = require("./routes/doctor");
const appointmentRoutes = require("./routes/appointment");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ["https://apna-clinic-phi.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like mobile apps or curl
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


// ✅ Parse incoming JSON requests
app.use(express.json());

console.log("Mongo URI:", process.env.MONGO_URI);


// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("DB error:", err));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

// ✅ Fallback (optional)
app.get("/", (req, res) => {
  res.send("Doctor Appointment Backend is running.");
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
