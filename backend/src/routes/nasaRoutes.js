const express = require("express");
const router = express.Router();

const nasaController = require("../controllers/nasaController");

// Define routes
router.get("/apod", nasaController.getApod);
router.get("/mars", nasaController.getMarsPhotos);
router.get("/neo", nasaController.getNeoFeed);
router.get("/epic", nasaController.getEpic);
router.get("/search", nasaController.searchImages);


module.exports = router;

// Log route initialization
console.log("NASA routes initialized");