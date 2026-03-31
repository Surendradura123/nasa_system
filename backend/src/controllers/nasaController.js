const nasaService = require("../services/nasaService");

exports.getApod = async (req, res) => {
  try {
    const data = await nasaService.getApod();
    res.status(200).json(data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch APOD" });
  }
};

exports.getMarsPhotos = async (req, res) => {
  try {
    const data = await nasaService.getMarsPhotos();
    res.status(200).json(data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch Mars photos" });
  }
};

exports.getNeoFeed = async (req, res) => {
  try {
    const data = await nasaService.getNeoFeed();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch NEO data" });
  }
};

console.log("Fetching data from NASA...");