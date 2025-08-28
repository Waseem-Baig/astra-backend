const express = require("express");
const ProductCategory = require("../models/ProductCategory");
const FeaturedModel = require("../models/FeaturedModel");
const TechnologyHighlight = require("../models/TechnologyHighlight");

const router = express.Router();

router.get("/categories", async (req, res) => {
  const categories = await ProductCategory.find();
  res.json(categories);
});

router.get("/featured-models", async (req, res) => {
  const models = await FeaturedModel.find();
  res.json(models);
});

router.get("/technology-highlights", async (req, res) => {
  const highlights = await TechnologyHighlight.find();
  res.json(highlights);
});

module.exports = router;
