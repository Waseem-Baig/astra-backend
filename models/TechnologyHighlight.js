const mongoose = require("mongoose");

const TechnologyHighlightSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model(
  "TechnologyHighlight",
  TechnologyHighlightSchema
);
