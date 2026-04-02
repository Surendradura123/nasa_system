const express = require("express");
const cors = require("cors");

const nasaRoutes = require("./routes/nasaRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", nasaRoutes);

// Health Check
app.get("/", (req, res) => {
  res.json({ message: "NASA API backend running" });
});


module.exports = app;

// Log app initialization
console.log("App initialized");