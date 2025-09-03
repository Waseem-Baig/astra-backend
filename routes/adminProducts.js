const express = require("express");
const multer = require("multer");
const ProductCategory = require("../models/ProductCategory");
const FeaturedModel = require("../models/FeaturedModel");
const OutdoorUnit = require("../models/OutdoorUnit");
const IndoorUnitCategory = require("../models/IndoorUnitCategory");
const TechnologyHighlight = require("../models/TechnologyHighlight");
const Offer = require("../models/Offer");
const {
  processImage,
  validateImage,
  base64ToBuffer,
} = require("../utils/imageHandler");

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Image upload endpoint
router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Validate image
    validateImage(req.file);

    // Process image
    const processedImage = await processImage(req.file.buffer, {
      maxWidth: 1200,
      maxHeight: 800,
      quality: 85,
      format: "jpeg",
      generateThumbnail: true,
      thumbnailSize: 300,
    });

    res.json({
      message: "Image processed successfully",
      image: {
        data: processedImage.data,
        contentType: processedImage.contentType,
        filename: req.file.originalname,
        size: processedImage.size,
      },
      thumbnail: processedImage.thumbnail,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Serve image endpoint
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

// Individual Unit Operations within Indoor Categories
router.post("/indoor-units/:categoryId/units", async (req, res) => {
  try {
    const category = await IndoorUnitCategory.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.units.push(req.body);
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/indoor-units/:categoryId/units/:unitIndex", async (req, res) => {
  try {
    const category = await IndoorUnitCategory.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const unitIndex = parseInt(req.params.unitIndex);
    if (unitIndex >= 0 && unitIndex < category.units.length) {
      category.units[unitIndex] = req.body;
      await category.save();
      res.json(category);
    } else {
      res.status(404).json({ error: "Unit not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete(
  "/indoor-units/:categoryId/units/:unitIndex",
  async (req, res) => {
    try {
      const category = await IndoorUnitCategory.findById(req.params.categoryId);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      const unitIndex = parseInt(req.params.unitIndex);
      if (unitIndex >= 0 && unitIndex < category.units.length) {
        category.units.splice(unitIndex, 1);
        await category.save();
        res.json(category);
      } else {
        res.status(404).json({ error: "Unit not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Offers CRUD
router.get("/offers", async (req, res) => {
  const offers = await Offer.find();
  res.json(offers);
});

router.post("/offers", async (req, res) => {
  const offer = new Offer(req.body);
  await offer.save();
  res.json(offer);
});

router.put("/offers/:id", async (req, res) => {
  const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(offer);
});

router.delete("/offers/:id", async (req, res) => {
  await Offer.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
