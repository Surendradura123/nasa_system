const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://nasa-system-backend.onrender.com/api"
    : "http://localhost:5001/api";

// 🔥 Safe fetch helper
async function fetchJSON(url) {
  try {
    const res = await fetch(url);

    // ❌ Handle HTTP errors
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const text = await res.text();

    // ❌ Prevent "Unexpected token <"
    try {
      return JSON.parse(text);
    } catch {
      console.error("Invalid JSON response:", text);
      throw new Error("Invalid JSON");
    }
  } catch (err) {
    console.error("API Error:", err.message);
    throw err;
  }
}

//
// 🌌 APOD
//
export const getApod = async () => {
  try {
    return await fetchJSON(`${BASE_URL}/apod`);
  } catch {
    return {
      title: "Fallback APOD",
      url: "https://apod.nasa.gov/apod/image/1901/IC405_Abolfath_3952.jpg",
      explanation: "Fallback image (API unavailable)",
    };
  }
};

//
// 🚀 Mars
//
export const getMars = async () => {
  try {
    const data = await fetchJSON(`${BASE_URL}/mars`);
    return {
      photos: data.photos || [],
    };
  } catch {
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
// 🌍 EPIC
//
export const getEpic = async () => {
  try {
    const data = await fetchJSON(`${BASE_URL}/epic`);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

//
// ☄️ NEO
//
export const getNeo = async () => {
  try {
    return await fetchJSON(`${BASE_URL}/neo`);
  } catch {
    return { near_earth_objects: {} };
  }
};

//
// 🔍 Search
//
export const searchImages = async (query = "space") => {
  try {
    const data = await fetchJSON(
      `${BASE_URL}/search?q=${encodeURIComponent(query)}`
    );

    return data?.collection?.items
      ? data
      : { collection: { items: [] } };
  } catch {
    return { collection: { items: [] } };
  }
};