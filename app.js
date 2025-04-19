const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const cors = require('cors');

// Middlewares
const errorMiddleware = require("./middlewares/error.js");
const userRoutes = require("./routes/employerRoutes.js");
const candidateRoutes = require("./routes/candidateRoutes.js");
const questionRoutes = require('./routes/questionRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const codingExecutionRoutes = require('./routes/codingExecutionRoutes');
const videoSessionRoutes = require('./routes/videoSessionRoutes');
const offerletterRoutes = require("./routes/offerletterRoutes.js")
const attendRoutes = require('./routes/attendRoutes.js');
const leaveRoutes = require("./routes/leaveRoutes.js");
// Initialize Express App
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Serve Static Uploads Folder
// app.use('/uploads', express.static('uploads'));

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1", candidateRoutes);
app.use('/api/v1/questions', questionRoutes);
app.use('/api/v1/interviews', interviewRoutes);
app.use('/api/v1/coding-execution', codingExecutionRoutes);
app.use('/api/v1/video-sessions', videoSessionRoutes);
app.use("/api/v1/offerletter",offerletterRoutes);
app.use("/api/v1/attendance",attendRoutes);
app.use("/api/v1/leave",leaveRoutes)
// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
  keyGenerator: (req) => req.ip,
});
app.use(limiter);

// Error Handling
app.use(errorMiddleware);

module.exports = app;
