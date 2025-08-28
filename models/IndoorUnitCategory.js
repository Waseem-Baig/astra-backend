const mongoose = require("mongoose");

const IndoorUnitSchema = new mongoose.Schema({
  name: String,
  model: String,
  capacity: String,
  features: [String],
  applications: [String],
});

const IndoorUnitCategorySchema = new mongoose.Schema({
  category: String,
  units: [IndoorUnitSchema],
});

module.exports = mongoose.model("IndoorUnitCategory", IndoorUnitCategorySchema);
