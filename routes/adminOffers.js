const express = require("express");
const Offer = require("../models/Offer");

const router = express.Router();

// Offer CRUD
router.get("/", async (req, res) => {
  const offers = await Offer.find();
  res.json(offers);
});

router.post("/", async (req, res) => {
  const offer = new Offer(req.body);
  await offer.save();
  res.json(offer);
});

router.put("/:id", async (req, res) => {
  const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(offer);
});

router.delete("/:id", async (req, res) => {
  await Offer.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
