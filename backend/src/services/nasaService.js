const axios = require("axios");
const config = require("../config/config");
const { getCache, setCache } = require("../utils/cache");

// 🔥 Axios instance (with timeout)
const nasaClient = axios.create({
  baseURL: config.nasaBaseUrl,
  timeout: 5000,
});

// 🔁 Retry helper
async function fetchWithRetry(fn, retries = 2) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
    }
  }
}

//
// 🌌 APOD
//
exports.getApod = async () => {
  const cacheKey = "apod";

  const cached = getCache(cacheKey);
  if (cached) {
    console.log("⚡ APOD cache hit");
    return cached;
  }

  try {
    const res = await fetchWithRetry(() =>
      nasaClient.get("/planetary/apod", {
        params: { api_key: config.nasaApiKey },
      })
    );

    setCache(cacheKey, res.data, 60 * 60 * 1000); // 1 hour
    return res.data;
  } catch {
    console.error("🚨 APOD failed → fallback");

    return {
      title: "Fallback APOD",
      url: "https://apod.nasa.gov/apod/image/1901/IC405_Abolfath_3952.jpg",
      explanation: "Fallback data",
    };
  }
};

//
// 🚀 Mars
//
let marsFailed = false;

exports.getMarsPhotos = async () => {
  const cacheKey = "mars_photos";

  const cached = getCache(cacheKey);
  if (cached) {
    console.log("⚡ Mars cache hit");
    return cached;
  }

  try {
    const res = await fetchWithRetry(() =>
      nasaClient.get("/mars-photos/api/v1/rovers/curiosity/photos", {
        params: {
          sol: 1000,
          api_key: config.nasaApiKey,
        },
      })
    );

    if (res.data?.photos) {
      setCache(cacheKey, res.data, 5 * 60 * 1000);
      return res.data;
    }

    throw new Error("Invalid Mars data");
  } catch {
    if (!marsFailed) {
      console.error("🚨 Mars failed → fallback");
      marsFailed = true;
    }

    return {
      photos: [
        {
          id: 1,
          img_src:
            "https://mars.nasa.gov/system/resources/detail_files/25667_PIA23764-16.jpg",
          earth_date: "Fallback",
          rover: { name: "Curiosity" },
        },
      ],
    };
  }
};

//
// ☄️ NEO
//
exports.getNeoFeed = async () => {
  const cacheKey = "neo_feed";

  const cached = getCache(cacheKey);
  if (cached) {
    console.log("⚡ NEO cache hit");
    return cached;
  }

  try {
    const res = await fetchWithRetry(() =>
      nasaClient.get("/neo/rest/v1/feed", {
        params: { api_key: config.nasaApiKey },
      })
    );

    setCache(cacheKey, res.data, 10 * 60 * 1000);
    return res.data;
  } catch {
    console.error("🚨 NEO failed → fallback");

    return {
      near_earth_objects: {},
    };
  }
};

//
// 🌍 EPIC
//
let epicFailed = false;

exports.getEpic = async () => {
  const cacheKey = "epic_images";

  const cached = getCache(cacheKey);
  if (cached) {
    console.log("⚡ EPIC cache hit");
    return cached;
  }

  try {
    const res = await fetchWithRetry(() =>
      nasaClient.get("/EPIC/api/natural")
    );

    if (res.data?.length > 0) {
      setCache(cacheKey, res.data, 10 * 60 * 1000);
      return res.data;
    }

    throw new Error("No EPIC data");
  } catch {
    if (!epicFailed) {
      console.error("🚨 EPIC fallback triggered");
      epicFailed = true;
    }

    // 🔁 Try last 5 days
    for (let i = 1; i <= 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const formatted = date.toISOString().split("T")[0];

      try {
        const res = await nasaClient.get(
          `/EPIC/api/natural/date/${formatted}`
        );

        if (res.data?.length > 0) {
          setCache(cacheKey, res.data, 10 * 60 * 1000);
          return res.data;
        }
      } catch {}
    }

    return [];
  }
};

//
// 🔍 Search
//
exports.searchImages = async (query = "space") => {
  try {
    const res = await fetchWithRetry(() =>
      axios.get("https://images-api.nasa.gov/search", {
        params: { q: query },
      })
    );

    return res.data;
  } catch {
    console.error("🚨 Search failed");

    return {
      collection: {
        items: [],
      },
    };
  }
};

// 🔥 Init log
console.log("🚀 NASA Service initialized (optimized + cached)");