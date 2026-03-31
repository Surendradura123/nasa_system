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
    const res = await axios.get(
      "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
      {
        params: {
          sol: 1000,
          api_key: process.env.NASA_API_KEY || "DEMO_KEY"
        }
      }
    );

    return res.data;

  } catch (err) {
    console.error("Mars API failed, using fallback");

    // ✅ fallback data
    return {
      photos: [
        {
          id: 1,
          img_src: "https://mars.nasa.gov/system/resources/detail_files/25667_PIA23764-16.jpg"
        },
        {
          id: 2,
          img_src: "https://mars.nasa.gov/system/resources/detail_files/25668_PIA23764-32.jpg"
        },
        {
          id: 3,
          img_src: "https://mars.nasa.gov/system/resources/detail_files/25669_PIA23764-48.jpg"
        }
      ]
    };
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