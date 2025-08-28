const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
  title: String,
  discount: String,
  description: String,
  validity: String,
  features: [String],
  popular: Boolean,
});

module.exports = mongoose.model("Offer", OfferSchema);
