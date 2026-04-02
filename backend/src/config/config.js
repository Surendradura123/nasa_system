require("dotenv").config();

// Centralized configuration for the NASA API backend
module.exports = {
  port: process.env.PORT || 5000,
  nasaApiKey: process.env.NASA_API_KEY,
  nasaBaseUrl: "https://api.nasa.gov"
};

// Log configuration details (without sensitive info)
console.log("Config loaded:", {
  port: process.env.PORT || 5000,
  nasaApiKey: process.env.NASA_API_KEY ? "[REDACTED]" : "Not set",
  nasaBaseUrl: "https://api.nasa.gov"
});