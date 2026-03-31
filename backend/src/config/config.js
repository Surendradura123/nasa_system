require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  nasaApiKey: process.env.NASA_API_KEY,
  nasaBaseUrl: "https://api.nasa.gov"
};

console.log("Config loaded:", {
  port: process.env.PORT || 5000,
  nasaApiKey: process.env.NASA_API_KEY ? "[REDACTED]" : "Not set",
  nasaBaseUrl: "https://api.nasa.gov"
});