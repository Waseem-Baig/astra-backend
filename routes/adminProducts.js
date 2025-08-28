const express = require("express");
const ProductCategory = require("../models/ProductCategory");
const FeaturedModel = require("../models/FeaturedModel");
const OutdoorUnit = require("../models/OutdoorUnit");
const IndoorUnitCategory = require("../models/IndoorUnitCategory");
const TechnologyHighlight = require("../models/TechnologyHighlight");

const router = express.Router();

// Product Categories CRUD
router.get("/categories", async (req, res) => {
  const categories = await ProductCategory.find();
  res.json(categories);
});

router.post("/categories", async (req, res) => {
  const category = new ProductCategory(req.body);
  await category.save();
  res.json(category);
});

router.put("/categories/:id", async (req, res) => {
  const category = await ProductCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(category);
});

router.delete("/categories/:id", async (req, res) => {
  await ProductCategory.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Featured Models CRUD
router.get("/featured-models", async (req, res) => {
  const models = await FeaturedModel.find();
  res.json(models);
});

router.post("/featured-models", async (req, res) => {
  const model = new FeaturedModel(req.body);
  await model.save();
  res.json(model);
});

router.put("/featured-models/:id", async (req, res) => {
  const model = await FeaturedModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(model);
});

router.delete("/featured-models/:id", async (req, res) => {
  await FeaturedModel.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Outdoor Units CRUD
router.get("/outdoor-units", async (req, res) => {
  const units = await OutdoorUnit.find();
  res.json(units);
});

router.post("/outdoor-units", async (req, res) => {
  const unit = new OutdoorUnit(req.body);
  await unit.save();
  res.json(unit);
});

router.put("/outdoor-units/:id", async (req, res) => {
  const unit = await OutdoorUnit.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(unit);
});

router.delete("/outdoor-units/:id", async (req, res) => {
  await OutdoorUnit.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Indoor Unit Categories CRUD
router.get("/indoor-units", async (req, res) => {
  const categories = await IndoorUnitCategory.find();
  res.json(categories);
});

router.post("/indoor-units", async (req, res) => {
  const category = new IndoorUnitCategory(req.body);
  await category.save();
  res.json(category);
});

router.put("/indoor-units/:id", async (req, res) => {
  const category = await IndoorUnitCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json(category);
});

router.delete("/indoor-units/:id", async (req, res) => {
  await IndoorUnitCategory.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Technology Highlights CRUD
router.get("/technology-highlights", async (req, res) => {
  const highlights = await TechnologyHighlight.find();
  res.json(highlights);
});

router.post("/technology-highlights", async (req, res) => {
  const highlight = new TechnologyHighlight(req.body);
  await highlight.save();
  res.json(highlight);
});

router.put("/technology-highlights/:id", async (req, res) => {
  const highlight = await TechnologyHighlight.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json(highlight);
});

router.delete("/technology-highlights/:id", async (req, res) => {
  await TechnologyHighlight.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
