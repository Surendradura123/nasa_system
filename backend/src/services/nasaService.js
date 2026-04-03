const axios = require("axios");
const config = require("../config/config");
const { getCache, setCache } = require("../utils/cache");

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
let marsFailed = false;

exports.getMarsPhotos = async () => {
  const cacheKey = "mars_photos";

  // ✅ Return cached data
  const cached = getCache(cacheKey);
  if (cached) {
    console.log("⚡ Mars cache hit");
    return cached;
  }

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

    if (res.data?.photos) {
      setCache(cacheKey, res.data, 5 * 60 * 1000); // 5 min cache
      return res.data;
    }

    throw new Error("Invalid Mars data");
  } catch (err) {
    if (!marsFailed) {
      console.error("🚨 Mars API failed → using fallback");
      marsFailed = true;
    }

    return {
      photos: [
        {
          id: 1,
          img_src:
            "https://mars.nasa.gov/system/resources/detail_files/25667_PIA23764-16.jpg",
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
let epicFailed = false;

exports.getEpic = async () => {
  const cacheKey = "epic_images";

  // ✅ Cache check
  const cached = getCache(cacheKey);
  if (cached) {
    console.log("⚡ EPIC cache hit");
    return cached;
  }

  try {
    const res = await nasaClient.get("/EPIC/api/natural");

    if (res.data?.length > 0) {
      setCache(cacheKey, res.data, 10 * 60 * 1000); // 10 min cache
      return res.data;
    }

    throw new Error("No EPIC data");
  } catch (err) {
    if (!epicFailed) {
      console.error("🚨 EPIC failed → trying fallback dates");
      epicFailed = true;
    }

    // 🔁 Try last 5 days
    for (let i = 1; i <= 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const formatted = date.toISOString().split("T")[0];

      try {
        const fallbackRes = await nasaClient.get(
          `/EPIC/api/natural/date/${formatted}`
        );

        if (fallbackRes.data?.length > 0) {
          setCache(cacheKey, fallbackRes.data, 10 * 60 * 1000);
          return fallbackRes.data;
        }
      } catch (e) {
        continue;
      }
    }

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