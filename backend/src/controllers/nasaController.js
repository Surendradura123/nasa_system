const nasaService = require("../services/nasaService");

// Fetch Astronomy Picture of the Day (APOD)
exports.getApod = async (req, res) => {
  try {
    const data = await nasaService.getApod();
    res.status(200).json(data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch APOD" });
  }
};

// Fetch Mars photos
exports.getMarsPhotos = async (req, res) => {
  try {
    const data = await nasaService.getMarsPhotos();
    res.status(200).json(data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch Mars photos" });
  }
};

// Fetch NEO feed
exports.getNeoFeed = async (req, res) => {
  try {
    const data = await nasaService.getNeoFeed();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch NEO data" });
  }
};

// Fetch EPIC data
exports.getEpic = async (req, res) => {
  try {
    const data = await nasaService.getEpic();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch EPIC data" });
  }
};

// Search NASA images based on query
exports.searchImages = async (req, res) => {
  try {
    const query = req.query.q || "space";
    const data = await nasaService.searchImages(query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};

// Log data fetching
console.log("Fetching data from NASA...");