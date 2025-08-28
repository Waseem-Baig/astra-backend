const mongoose = require("mongoose");

const FeaturedModelSchema = new mongoose.Schema({
  model: String,
  type: String,
  efficiency: String,
  price: String,
  features: [String],
});

module.exports = mongoose.model("FeaturedModel", FeaturedModelSchema);
