const express = require("express");
const cors = require("cors");

const nasaRoutes = require("./routes/nasaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", nasaRoutes);

app.get("/", (req, res) => {
  res.json({ message: "NASA API backend running" });
});


module.exports = app;

console.log("App initialized");