const axios = require("axios");

let fallbackLogged = false;

exports.getApod = async () => {
  try {
    const res = await axios.get("https://api.nasa.gov/planetary/apod", {
      params: {
        api_key: process.env.NASA_API_KEY || "DEMO_KEY"
      }
    });

    return res.data;

  } catch (err) {
    console.error("APOD Error:", err.response?.data || err.message);
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
    // ✅ log only once (clean logs)
    if (!fallbackLogged) {
      console.warn("⚠️ Mars API unavailable → using fallback data");
      fallbackLogged = true;
    }

    // ✅ fallback data (stable UI)
    return {
      photos: [
        {
          id: 1,
          img_src:
            "https://mars.nasa.gov/system/resources/detail_files/25667_PIA23764-16.jpg"
        },
        {
          id: 2,
          img_src:
            "https://mars.nasa.gov/system/resources/detail_files/25668_PIA23764-32.jpg"
        },
        {
          id: 3,
          img_src:
            "https://mars.nasa.gov/system/resources/detail_files/25669_PIA23764-48.jpg"
        }
      ]
    };
  }
};

exports.getNeoFeed = async () => {
  try {
    const res = await axios.get("https://api.nasa.gov/neo/rest/v1/feed", {
      params: {
        api_key: process.env.NASA_API_KEY || "DEMO_KEY"
      }
    });

    return res.data;

  } catch (err) {
    console.error("NEO Error:", err.response?.data || err.message);
    throw err;
  }
};

// 🌍 EPIC (Earth images)
exports.getEpic = async () => {
  try {
    const res = await nasaClient.get("/EPIC/api/natural", {
      params: { api_key: config.nasaApiKey }
    });

    return res.data;
  } catch (err) {
    console.error("EPIC API failed");

    return [
      {
        identifier: "fallback",
        caption: "Earth Image",
        image: "epic_1b_20220301000000"
      }
    ];
  }
};

// 🔎 NASA Image Search
exports.searchImages = async (query = "space") => {
  try {
    const res = await nasaClient.get(
      "https://images-api.nasa.gov/search",
      {
        params: { q: query }
      }
    );

    return res.data;
  } catch (err) {
    console.error("NASA Search API failed");

    return {
      collection: {
        items: []
      }
    };
  }
};