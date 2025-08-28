const mongoose = require("mongoose");

const ProductCategorySchema = new mongoose.Schema({
  title: String,
  description: String,
  features: [String],
  popular: Boolean,
});

module.exports = mongoose.model("ProductCategory", ProductCategorySchema);
