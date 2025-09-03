const mongoose = require("mongoose");

const FeaturedModelSchema = new mongoose.Schema(
  {
    model: String,
    type: String,
    efficiency: String,
    price: String,
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
    // Additional product details
    specifications: {
      capacity: String,
      energyRating: String,
      dimensions: String,
      weight: String,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt
  }
);

module.exports = mongoose.model("FeaturedModel", FeaturedModelSchema);
