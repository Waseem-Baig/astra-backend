require("dotenv").config();
const mongoose = require("mongoose");
const OutdoorUnit = require("../models/OutdoorUnit");
const IndoorUnitCategory = require("../models/IndoorUnitCategory");
const ApplicationChart = require("../models/ApplicationChart");

const outdoorUnits = [
  {
    type: "Single Outdoor Unit",
    capacity: "Up to 20 HP",
    model: "RXYQ",
    description: "Compact single unit design for small to medium applications",
    features: [
      "4D Inverter Control",
      "VRT Smart Technology",
      "Quiet Operation",
    ],
  },
  {
    type: "Double Unit Combination",
    capacity: "22 to 48 HP",
    model: "RXYQ",
    description: "Dual unit setup for larger commercial spaces",
    features: ["Enhanced Capacity", "Redundancy", "Flexible Installation"],
  },
  {
    type: "Triple Unit Combination",
    capacity: "50 to 60 HP",
    model: "RXYQ",
    description: "Maximum capacity for large commercial buildings",
    features: ["Highest Capacity", "Maximum Flexibility", "Enterprise Grade"],
  },
];

const indoorUnitCategories = [
  {
    category: "Ceiling Cassette",
    units: [
      {
        name: "Round Flow Type",
        model: "FXFQ",
        capacity: "0.8 to 4.5 HP",
        features: [
          "360° airflow",
          "Individual louvre control",
          "Motion sensors",
          "Stylish flat panel",
        ],
        applications: ["Office", "Hotel", "Retail"],
      },
      {
        name: "Corner Type",
        model: "FXZQ",
        capacity: "1.6 to 2.2 HP",
        features: [
          "Compact corner-fit design",
          "4-way airflow",
          "Space efficient",
        ],
        applications: ["Small Office", "Clinic"],
      },
      {
        name: "Double Flow",
        model: "FXCQ",
        capacity: "1.0 to 2.2 HP",
        features: ["Two-way blow", "Compact square design", "Quiet operation"],
        applications: ["Conference Room", "Reception"],
      },
      {
        name: "Multi Flow Type",
        model: "FXMQ-MF",
        capacity: "2.2 to 6.0 HP",
        features: [
          "Horizontal installation",
          "Duct connection for multi-zone cooling",
          "Slim and quiet",
        ],
        applications: ["Commercial", "Multi-zone"],
      },
    ],
  },
  {
    category: "Wall Mounted",
    units: [
      {
        name: "Wall Mounted Type",
        model: "FXAQ",
        capacity: "0.8 to 2.2 HP",
        features: ["Stylish compact design", "Auto swing", "Easy installation"],
        applications: ["Office", "Hotel Room", "Clinic"],
      },
    ],
  },
  {
    category: "Floor Standing",
    units: [
      {
        name: "Floor Standing Concealed",
        model: "FXNQ",
        capacity: "1.1 to 4.5 HP",
        features: [
          "Mounted at floor level",
          "Hidden installation",
          "Easy maintenance",
        ],
        applications: ["Office", "Showroom"],
      },
      {
        name: "Floor Standing Cabinet",
        model: "FXLQ",
        capacity: "1.1 to 4.5 HP",
        features: [
          "Slim cabinet design",
          "Front discharge",
          "Floor-mounted convenience",
        ],
        applications: ["Large Office", "Hall"],
      },
    ],
  },
  {
    category: "Ceiling Suspended",
    units: [
      {
        name: "Ceiling Suspended Type",
        model: "FXHQ",
        capacity: "1.1 to 4.5 HP",
        features: [
          "No ductwork required",
          "Wide airflow",
          "Ideal for large rooms and open halls",
        ],
        applications: ["Large Office", "Hall", "Showroom"],
      },
    ],
  },
  {
    category: "Ducted Units",
    units: [
      {
        name: "Low Static Pressure",
        model: "FXSQ",
        capacity: "0.8 to 4.5 HP",
        features: [
          "Slim profile (200mm height)",
          "Up to 150 Pa",
          "Hidden installation",
        ],
        applications: ["Office", "Hotel"],
      },
      {
        name: "Mid Static Pressure",
        model: "FXMQ-MF",
        capacity: "2.2 to 6.0 HP",
        features: ["Up to 150 Pa", "Longer duct runs", "Ultra-slim design"],
        applications: ["Commercial", "Retail"],
      },
      {
        name: "High Static Pressure",
        model: "FXMQ-P",
        capacity: "5.6 to 16.0 HP",
        features: [
          "Up to 250 Pa",
          "Large airflow capacity",
          "Commercial ducted systems",
        ],
        applications: ["Mall", "Factory", "Hospital"],
      },
      {
        name: "Duct Connection Slim Type",
        model: "FXDQ",
        capacity: "0.8 to 2.2 HP",
        features: [
          "Slim design for false ceilings",
          "Quiet operation",
          "Ideal for hotels and offices",
        ],
        applications: ["Hotel", "Office", "Clinic"],
      },
    ],
  },
];

const applicationChart = [
  {
    capacity: "6-10 HP",
    application: "Small Building",
    building: "Clinic, Small Office",
  },
  {
    capacity: "12-20 HP",
    application: "Medium Building",
    building: "Restaurant, Boutique",
  },
  {
    capacity: "22-36 HP",
    application: "Large Building",
    building: "Shopping Mall, Hotel",
  },
  {
    capacity: "40-60 HP",
    application: "Enterprise",
    building: "Office Complex, Hospital",
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await OutdoorUnit.deleteMany();
  await IndoorUnitCategory.deleteMany();
  await ApplicationChart.deleteMany();
  await OutdoorUnit.insertMany(outdoorUnits);
  await IndoorUnitCategory.insertMany(indoorUnitCategories);
  await ApplicationChart.insertMany(applicationChart);
  console.log("Database seeded successfully");
  mongoose.disconnect();
}

seed();
