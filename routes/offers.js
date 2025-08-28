const express = require("express");
const Offer = require("../models/Offer");
const OfferBenefit = require("../models/OfferBenefit");

const router = express.Router();

router.get("/", async (req, res) => {
  const offers = await Offer.find();
  res.json(offers);
});

router.get("/benefits", async (req, res) => {
  const benefits = await OfferBenefit.find();
  res.json(benefits);
});

module.exports = router;
