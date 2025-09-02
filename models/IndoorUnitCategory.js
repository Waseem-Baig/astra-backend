const mongoose = require("mongoose");

// Schema to match frontend expectations
const IndoorUnitCategorySchema = new mongoose.Schema({
  category: String,
  units: [
    {
      name: String,
      model: String,
      capacity: String,
      features: [String],
      applications: [String],
    },
  ],
});

module.exports = mongoose.model("IndoorUnitCategory", IndoorUnitCategorySchema);
