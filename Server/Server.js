// server.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); // Load .env first
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("MONGODB_ATLAS_URI:", process.env.MONGODB_ATLAS_URI);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const { initializeSocket } = require("./socket/socketHandler");

const app = express();

// ----------------------------
// Middleware
// ----------------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------------------------
// Routes
// ----------------------------
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/assessments", require("./routes/assessments"));
app.use("/api/competencies", require("./routes/competencies"));
app.use("/api/resources", require("./routes/resources"));
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api/analytics", require("./routes/analytics"));
app.use("/api/upload", require("./routes/upload"));

// ----------------------------
// MongoDB Connection
// ----------------------------
const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_ATLAS_URI;

if (!mongoUri) {
  console.error("MongoDB URI is undefined. Check your .env file!");
  process.exit(1);
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// ----------------------------
// Create HTTP server + initialize Socket.IO
// ----------------------------
const server = http.createServer(app);
const io = initializeSocket(server); // <-- aligned with socketHandler.js

// ----------------------------
// Start Server
// ----------------------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
