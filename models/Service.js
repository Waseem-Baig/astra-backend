const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  title: String,
  description: String,
  features: [String],
  color: String,
});

module.exports = mongoose.model("Service", ServiceSchema);
