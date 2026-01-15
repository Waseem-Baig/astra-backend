const mongoose = require("mongoose");

const CassetteACSchema = new mongoose.Schema(
  {
    series: {
      type: String,
      required: true,
      enum: ["FKCAQ", "FCMF", "FCVF", "FCVFQ", "FCQF"],
    },
    title: String,
    description: String,
    type: String, // Cassette, Round Flow Cassette, Single Way Cassette, etc.
    efficiency: String, // 3 Star, 4 Star, 5 Star Inverter

    // Models arrays
    indoorUnitModels: [String],
    outdoorUnitModels: [String],

    // Efficiency ratings
    iseerRatings: [
      {
        model: String,
        iseer: String,
        stars: String,
      },
    ],

    // Features
    features: [String],

    // Technical specifications
    specifications: {
      fanSpeed: String,
      ceilingHeight: String,
      airflow: String,
      operationMode: String,
      dimensions: String,
      weight: String,
      powerConsumption: String,
      refrigerant: String,
    },

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

    // Status and categorization
    popular: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    category: { type: String, default: "SA" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CassetteAC", CassetteACSchema);
