require("dotenv").config();
const mongoose = require("mongoose");
const ProductCategory = require("../models/ProductCategory");
const FeaturedModel = require("../models/FeaturedModel");
const TechnologyHighlight = require("../models/TechnologyHighlight");

const productCategories = [
  {
    title: "Split ACs",
    description: "1.0 to 2.2 HP range for homes and offices",
    features: ["Inverter Technology", "Energy Efficient", "Quiet Operation"],
    popular: true,
  },
  {
    title: "Cassette ACs",
    description: "360° airflow for commercial spaces",
    features: ["Round Flow Type", "Corner Fit Design", "Multi Flow Options"],
    popular: false,
  },
  {
    title: "VRV Systems",
    description: "6 HP to 60 HP for large commercial buildings",
    features: ["Variable Refrigerant Volume", "Long Piping", "Energy Saving"],
    popular: false,
  },
  {
    title: "Commercial Units",
    description: "High capacity ducted and concealed units",
    features: [
      "High Static Pressure",
      "Flexible Installation",
      "Quiet Operation",
    ],
    popular: false,
  },
];

const featuredModels = [
  {
    model: "FTKM Series",
    type: "1.5 Ton Split AC",
    efficiency: "5 Star",
    price: "Starting ₹41,000",
    features: ["Inverter Technology", "Copper Coil", "Wi-Fi Ready"],
  },
  {
    model: "FXFQ Series",
    type: "2 Ton Cassette AC",
    efficiency: "5 Star",
    price: "Starting ₹65,000",
    features: ["360° Airflow", "Motion Sensor", "Compact Design"],
  },
  {
    model: "RXYQ Series",
    type: "VRV Outdoor Unit",
    efficiency: "High COP",
    price: "Starting ₹2,50,000",
    features: ["Variable Speed", "R-32 Refrigerant", "Quiet Operation"],
  },
];

const technologyHighlights = [
  { name: "4D Inverter Control" },
  { name: "VRT Smart Technology" },
  { name: "Automatic System Check" },
  { name: "Long Piping Design" },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await ProductCategory.deleteMany();
  await FeaturedModel.deleteMany();
  await TechnologyHighlight.deleteMany();
  await ProductCategory.insertMany(productCategories);
  await FeaturedModel.insertMany(featuredModels);
  await TechnologyHighlight.insertMany(technologyHighlights);
  console.log("ProductsPreview data seeded successfully");
  mongoose.disconnect();
}

seed();
