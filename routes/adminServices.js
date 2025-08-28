const express = require("express");
const Service = require("../models/Service");

const router = express.Router();

// Service CRUD
router.get("/", async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

router.post("/", async (req, res) => {
  const service = new Service(req.body);
  await service.save();
  res.json(service);
});

router.put("/:id", async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(service);
});

router.delete("/:id", async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
