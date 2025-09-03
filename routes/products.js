const express = require("express");
const OutdoorUnit = require("../models/OutdoorUnit");
const IndoorUnitCategory = require("../models/IndoorUnitCategory");
const ApplicationChart = require("../models/ApplicationChart");
const ProductCategory = require("../models/ProductCategory");
const FeaturedModel = require("../models/FeaturedModel");
const TechnologyHighlight = require("../models/TechnologyHighlight");
const Offer = require("../models/Offer");
const { base64ToBuffer } = require("../utils/imageHandler");

const router = express.Router();

router.get("/outdoor-units", async (req, res) => {
  const units = await OutdoorUnit.find();
  res.json(units);
});

router.get("/indoor-units", async (req, res) => {
  const categories = await IndoorUnitCategory.find();
  res.json(categories);
});

router.get("/application-chart", async (req, res) => {
  const chart = await ApplicationChart.find();
  res.json(chart);
});

// Public image serving endpoint
router.get("/image/:type/:id", async (req, res) => {
  try {
    const { type, id } = req.params;
    const { thumbnail = false } = req.query;

    let Model;
    switch (type) {
      case "category":
        Model = ProductCategory;
        break;
      case "featured":
        Model = FeaturedModel;
        break;
      case "outdoor":
        Model = OutdoorUnit;
        break;
      case "indoor":
        Model = IndoorUnitCategory;
        break;
      case "technology":
        Model = TechnologyHighlight;
        break;
      case "offer":
        Model = Offer;
        break;
      default:
        return res.status(400).json({ error: "Invalid type" });
    }

    const item = await Model.findById(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const imageData = thumbnail === "true" ? item.thumbnail : item.image;
    if (!imageData || !imageData.data) {
      return res.status(404).json({ error: "Image not found" });
    }

    const buffer = base64ToBuffer(imageData.data, imageData.contentType);
    res.set("Content-Type", imageData.contentType);
    res.set("Cache-Control", "public, max-age=31536000"); // Cache for 1 year
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
