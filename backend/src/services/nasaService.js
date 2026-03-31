const axios = require("axios");
const config = require("../config/config");

const nasaClient = axios.create({
  baseURL: config.nasaBaseUrl
});

exports.getApod = async () => {
  try {
    const res = await nasaClient.get("/planetary/apod", {
      params: { api_key: config.nasaApiKey }
    });

    return res.data;
  } catch (err) {
    console.error("Error fetching APOD:", err);
    throw err;
  }
};

exports.getMarsPhotos = async () => {
  try {
    const res = await nasaClient.get(
      "/mars-photos/api/v1/rovers/curiosity/photos",
      {
        params: {
          sol: 1000,
          api_key: config.nasaApiKey || "DEMO_KEY"
        }
      }
    );

    return res.data;

  } catch (err) {
    console.error("🔥 NASA ERROR FULL:", {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message
    });

    throw err;
  }
};

exports.getNeoFeed = async () => {
  try {
    const res = await nasaClient.get("/neo/rest/v1/feed", {
      params: { api_key: config.nasaApiKey }
    });

    return res.data;

  } catch (err) {
    console.error("Error fetching NEO feed:", err.response?.data || err.message);
    throw err;
  }
};

console.log("NASA service initialized");