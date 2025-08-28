const express = require("express");
const Service = require("../models/Service");

const router = express.Router();

router.get("/", async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

module.exports = router;
