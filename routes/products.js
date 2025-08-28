const express = require("express");
const OutdoorUnit = require("../models/OutdoorUnit");
const IndoorUnitCategory = require("../models/IndoorUnitCategory");
const ApplicationChart = require("../models/ApplicationChart");

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

module.exports = router;
