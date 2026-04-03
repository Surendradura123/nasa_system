const axios = require("axios");
const config = require("../config/config");

// axios instance
const nasaClient = axios.create({
  baseURL: config.nasaBaseUrl,
});

// 🌌 APOD
exports.getApod = async () => {
  try {
    const res = await nasaClient.get("/planetary/apod", {
      params: { api_key: config.nasaApiKey },
    });

    return res.data;
  } catch (err) {
    console.error("APOD API failed");

    return {
      title: "Fallback APOD",
      url: "https://apod.nasa.gov/apod/image/1901/IC405_Abolfath_3952.jpg",
      explanation: "Fallback data",
    };
  }
};

// 🚀 Mars Rover Photos
exports.getMarsPhotos = async () => {
  try {
    const res = await nasaClient.get(
      "/mars-photos/api/v1/rovers/curiosity/photos",
      {
        params: {
          sol: 1000,
          api_key: config.nasaApiKey,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error("Mars API failed, using fallback");

    return {
      photos: [
        {
          id: 1,
          img_src:
            "https://mars.nasa.gov/system/resources/detail_files/25667_PIA23764-16.jpg",
        },
        {
          id: 2,
          img_src:
            "https://mars.nasa.gov/system/resources/detail_files/25668_PIA23764-32.jpg",
        },
      ],
    };
  }
};

// ☄️ Near Earth Objects (NeoWs)
exports.getNeoFeed = async () => {
  try {
    const res = await nasaClient.get("/neo/rest/v1/feed", {
      params: { api_key: config.nasaApiKey },
    });

    return res.data;
  } catch (err) {
    console.error("NEO API failed");

    return {
      near_earth_objects: {},
    };
  }
};

// 🌍 EPIC (Earth images)
exports.getEpic = async () => {
  try {
    // 🔥 Try latest data
    const res = await nasaClient.get("/EPIC/api/natural");

    if (res.data && res.data.length > 0) {
      return res.data;
    }

    throw new Error("No EPIC data");
  } catch (err) {
    console.error("EPIC latest failed, trying previous dates...");

    // 🔁 Try last 5 days dynamically
    for (let i = 1; i <= 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const formatted = date.toISOString().split("T")[0];

      try {
        const fallbackRes = await nasaClient.get(
          `/EPIC/api/natural/date/${formatted}`
        );

        if (fallbackRes.data && fallbackRes.data.length > 0) {
          console.log("Using fallback date:", formatted);
          return fallbackRes.data;
        }
      } catch (e) {
        continue;
      }
    }

    // ❌ If nothing works
    return [];
  }
};


// 🔍 NASA Image & Video Library (Search)
exports.searchImages = async (query = "space") => {
  try {
    const res = await axios.get(
      "https://images-api.nasa.gov/search",
      {
        params: { q: query },
      }
    );

    return res.data;
  } catch (err) {
    console.error("Search API failed");

    return {
      collection: {
        items: [],
      },
    };
  }
};

// Log service initialization
console.log("NASA Service initialized");