const mongoose = require("mongoose");

const OutdoorUnitSchema = new mongoose.Schema({
  type: String,
  capacity: String,
  model: String,
  description: String,
  features: [String],
});

module.exports = mongoose.model("OutdoorUnit", OutdoorUnitSchema);
