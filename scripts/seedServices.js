require("dotenv").config();
const mongoose = require("mongoose");
const Service = require("../models/Service");

const services = [
  {
    title: "VRT Smart Control",
    description:
      "Adjusts refrigerant temperature automatically based on indoor load, climate, and occupancy",
    features: [
      "Quick Mode for rapid cooling",
      "Powerful Mode for maximum capacity",
      "Mild Mode for energy efficiency",
      "Auto Mode for optimal comfort",
    ],
    color: "text-blue-600",
  },
  {
    title: "Automatic Refrigerant Charging",
    description:
      "Simplifies installation by automatically detecting the optimal refrigerant level",
    features: [
      "Automatic detection system",
      "Prevents over/under charging",
      "Ensures optimal performance",
      "Reduces installation time",
    ],
    color: "text-green-600",
  },
  {
    title: "Automatic System Check",
    description:
      "Comprehensive system verification for perfect installation and operation",
    features: [
      "Checks wiring connections",
      "Verifies piping integrity",
      "Tests stop valve operation",
      "Ensures correct installation",
    ],
    color: "text-purple-600",
  },
  {
    title: "Easy Maintenance Features",
    description: "Advanced maintenance capabilities without system shutdown",
    features: [
      "Individual unit shutdown capability",
      "Silver ion antibacterial treatment",
      "Digital system diagnostics",
      "7-segment display monitoring",
    ],
    color: "text-orange-600",
  },
  {
    title: "Energy-Saving Innovations",
    description:
      "Advanced technologies for maximum energy efficiency and cost savings",
    features: [
      "Enhanced COP during low load",
      "Advanced inverter control",
      "High tensile scroll compressors",
      "Reduced standby power consumption",
    ],
    color: "text-emerald-600",
  },
  {
    title: "Flexible System Design",
    description:
      "Versatile installation options for any commercial or residential application",
    features: [
      "Long piping lengths up to 1000m total",
      "Wide connection ratios up to 200%",
      "Simplified commissioning process",
      "VRV Configurator support",
    ],
    color: "text-indigo-600",
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Service.deleteMany();
  await Service.insertMany(services);
  console.log("Services data seeded successfully");
  mongoose.disconnect();
}

seed();
