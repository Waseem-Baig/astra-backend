const mongoose = require("mongoose");

const ProductCategorySchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    features: [String],
    popular: Boolean,
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
  },
  {
    timestamps: true, // Add createdAt and updatedAt
  }
);

module.exports = mongoose.model("ProductCategory", ProductCategorySchema);
