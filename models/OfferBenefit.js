const mongoose = require("mongoose");

const OfferBenefitSchema = new mongoose.Schema({
  title: String,
  description: String,
});

module.exports = mongoose.model("OfferBenefit", OfferBenefitSchema);
