const mongoose = require("mongoose");

const OutdoorUnitSchema = new mongoose.Schema(
  {
    type: String,
    capacity: String,
    model: String,
    description: String,
    features: [String],
    // Image storage fields
    image: {
      data: String, // Base64 encoded image data
      contentType: String, // MIME type (image/jpeg, image/png, etc.)
      filename: String, // Original filename
      size: Number, // File size in bytes
    },
    thumbnail: {
      data: String, // Base64 encoded thumbnail data
      contentType: String,
    },
    // Technical specifications
    specifications: {
      powerConsumption: String,
      operatingRange: String,
      refrigerant: String,
      dimensions: String,
      weight: String,
      soundLevel: String,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt
  }
);

module.exports = mongoose.model("OutdoorUnit", OutdoorUnitSchema);
