const mongoose = require("mongoose");

const ResidentialACSchema = new mongoose.Schema(
  {
    series: {
      type: String,
      required: true,
      enum: ["RA", "Inverter", "Non-Inverter"],
    },
    title: String,
    description: String,
    type: String, // Inverter Series, Non-Inverter Series, etc.

    // Advanced Features (RA specific)
    advancedFeatures: [
      {
        name: String,
        description: String,
        specification: String, // e.g., "ISEER up to 6.3", "Operation up to 56°C"
      },
    ],

    // Technology highlights
    technologies: [String],

    // Energy efficiency details
    efficiency: {
      maxISEER: String,
      energySavings: String,
      starRating: String,
    },

    // Features array
    features: [String],

    // Technical specifications
    specifications: {
      operatingRange: String,
      airThrow: String,
      filtrationStages: String,
      compressorType: String,
      refrigerant: String,
      powerConsumption: String,
      dimensions: String,
      weight: String,
    },

    // Image storage fields
    image: {
      data: String,
      contentType: String,
      filename: String,
      size: Number,
    },
    thumbnail: {
      data: String,
      contentType: String,
    },

    // Status and categorization
    popular: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    category: { type: String, default: "RA" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ResidentialAC", ResidentialACSchema);
