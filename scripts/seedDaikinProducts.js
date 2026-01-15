require("dotenv").config();
const mongoose = require("mongoose");
const ProductCategory = require("../models/ProductCategory");
const FeaturedModel = require("../models/FeaturedModel");
const OutdoorUnit = require("../models/OutdoorUnit");
const IndoorUnitCategory = require("../models/IndoorUnitCategory");

// SA Products - Cassette AC Types
const saProductCategories = [
  {
    title: "Single Way Cassette Type (FKCAQ Series)",
    description:
      "A new type of 1-Way ceiling cassette AC with a sleek appearance and low ceiling height indoor unit (166mm)",
    features: [
      "5-step fan speed",
      "Low ceiling height indoor unit (166mm)",
      "Quiet and compact design",
      "Automatic air swing",
      "Drain pump mechanism",
    ],
    popular: false,
    category: "SA",
  },
  {
    title: "Round Flow Cassette Type (FCMF-Series)",
    description:
      "5 Star Inverter Round Flow Cassette with 360° uniform airflow and individual air flow control",
    features: [
      "360° uniform airflow",
      "Individual air flow control",
      "Silver ion antibacterial drain pan",
      "Night quiet operation",
      "Swing pattern selection",
      "Drain pump mechanism",
    ],
    popular: true,
    category: "SA",
  },
  {
    title: "Round Flow Cassette Type (FCVF-Series)",
    description:
      "4 Star Inverter Round Flow Cassette with 360° uniform airflow and advanced features",
    features: [
      "360° uniform airflow",
      "Individual air flow control",
      "Silver ion antibacterial drain pan",
      "Night quiet operation",
      "Swing pattern selection",
      "Drain pump mechanism",
    ],
    popular: false,
    category: "SA",
  },
  {
    title: "3x3 Cassette Type (FCVFQ-Series)",
    description:
      "3 Star Inverter 3x3 Cassette with round flow design and individual air flow control",
    features: [
      "Round flow design",
      "Individual air flow control",
      "Silver ion antibacterial drain pan",
      "Night quiet operation",
      "Drain pump mechanism",
      "Swing pattern selection",
    ],
    popular: false,
    category: "SA",
  },
  {
    title: "Cassette Type (FCQF-Series)",
    description:
      "Standard cassette type with eight way discharge panel and advanced features",
    features: [
      "New eight way discharge panel",
      "7-segment temperature display",
      "Sleep mode",
      "Power chill operation for powerful cooling for 20 minutes",
      "Surround air flow",
      "Fresh air intake",
      "Branch duct connection",
      "Coanda function directs airflow upwards",
      "Econo operation limits power consumption",
      "Timer function",
      "Child lock",
    ],
    popular: false,
    category: "SA",
  },
];

// SA Featured Models with detailed specifications
const saFeaturedModels = [
  {
    model: "FKCAQ50AV16",
    type: "Single Way Cassette",
    efficiency: "ISEER 4.10/3 Stars",
    price: "Contact for Quote",
    features: [
      "1-Way ceiling cassette",
      "5-step fan speed",
      "Low ceiling height (166mm)",
      "Quiet operation",
    ],
    specifications: {
      capacity: "1.5 Ton",
      energyRating: "3 Star Inverter",
      type: "Cassette",
      series: "FKCAQ",
    },
    category: "SA",
  },
  {
    model: "FCMF50ARV169",
    type: "Round Flow Cassette",
    efficiency: "ISEER 5.2/5 Stars",
    price: "Contact for Quote",
    features: [
      "360° uniform airflow",
      "Individual air flow control",
      "Silver ion antibacterial drain pan",
    ],
    specifications: {
      capacity: "1.5 Ton",
      energyRating: "5 Star Inverter",
      type: "Round Flow Cassette",
      series: "FCMF",
    },
    category: "SA",
  },
  {
    model: "FCVF71ARV169",
    type: "Round Flow Cassette",
    efficiency: "ISEER 4.85/4 Stars",
    price: "Contact for Quote",
    features: [
      "360° uniform airflow",
      "Individual air flow control",
      "Night quiet operation",
    ],
    specifications: {
      capacity: "2.0 Ton",
      energyRating: "4 Star Inverter",
      type: "Round Flow Cassette",
      series: "FCVF",
    },
    category: "SA",
  },
];

// RA Products - Residential AC with Advanced Features
const raProductCategories = [
  {
    title: "Inverter Series (Residential)",
    description:
      "Energy-efficient cooling with variable speed cooling, automatically adjusting compressor speed to match required temperature",
    features: [
      "Variable speed cooling",
      "Eliminates constant on/off cycling",
      "Significant energy savings",
      "Quiet & consistent operation",
      "Quick & powerful cooling",
      "Eco-friendly with smaller carbon footprint",
    ],
    popular: true,
    category: "RA",
  },
  {
    title: "Non-Inverter Series (Residential)",
    description:
      "Cost-effective solution with robust and reliable on/off compressor cycle for straightforward cooling",
    features: [
      "Budget-friendly initial purchase price",
      "Robust & reliable mechanics",
      "Straightforward operation",
      "Great for large open areas",
      "Simple on/off mechanism",
      "Easy to understand and maintain",
    ],
    popular: false,
    category: "RA",
  },
];

// RA Featured Models with Advanced Technologies
const raFeaturedModels = [
  {
    model: "RA Series with 6.3 ISEER",
    type: "Advanced Inverter Residential",
    efficiency: "Up to 6.3 ISEER (26% improvement over 5-star)",
    price: "Premium Range",
    features: [
      "Tru Inverter with Swing Compressor",
      "Patented DNNS Self Heal Coating",
      "Anti-Corrosion Treatment",
      "IoT enabled with Google Home & Alexa support",
      "Hepta Sense (7 sensors)",
      "Multi-Layer Fire Safety",
      "Auto On-Off by Intelligent Eye",
      "High Ambient Operation up to 56°C",
      "Dew Clean Technology",
      "Triple Display",
      "3-Stage Air Filtration",
      "Powerful Air Throw up to 52 feet",
    ],
    specifications: {
      capacity: "Various",
      energyRating: "Up to 6.3 ISEER",
      type: "Advanced Inverter",
      maxOperatingTemp: "56°C",
    },
    category: "RA",
  },
];

// PA Products - Package AC Systems
const paProductCategories = [
  {
    title: "High Static Pressure Duct Type",
    description:
      "Industry-leading energy efficiency for lower power bills with high performance even at high ambient temperatures",
    features: [
      "High performance even at high ambient temperatures up to 48°C",
      "New wired LCD remote controller with alphabetic error display",
      "Under voltage and over voltage protection",
      "Phase imbalance voltage and Phase reversal protection",
      "Pre-charged refrigerant for up to 7.5-meter piping",
      "Superior air distribution through ducting",
      "Multiple rooms can be cooled with a single unit",
      "Fresh air intake for improved indoor air quality",
      "Compact indoor unit design with twin coil structure",
      "Scroll compressor for better energy efficiency",
      "Anti-corrosion treated heat exchanger fins",
      "Washable air filter as standard",
    ],
    popular: true,
    category: "PA",
  },
  {
    title: "Air-Cooled Rooftop Units (Cooling only)",
    description:
      "Easy to install rooftop units requiring only ducting with best in market performance for high energy savings",
    features: [
      "Easy to install, requiring only ducting",
      "Aesthetic and neat appearance with compact design",
      "Corrosion-resistant construction",
      "Designed for high ambient applications up to 52°C",
      "Flexible air supply using Variable Pitch Pulley",
      "Convertible from horizontal to vertical discharge",
      "Scroll compressors with rubber vibration isolators",
      "User-friendly wired remote controller",
      "UltraGold Fin treatment for longer lifespan",
    ],
    popular: false,
    category: "PA",
  },
  {
    title: "Air-Cooled Rooftop Units (Heat Pump)",
    description:
      "Heat pump rooftop units with same features as cooling-only models plus heating capabilities",
    features: [
      "Same features as cooling-only rooftop units",
      "Heating and cooling capabilities",
      "Hermetically sealed scroll compressors",
      "Independent electronic expansion devices",
      "Optional economizer and auxiliary heater",
      "Basic BMS connection capability",
    ],
    popular: false,
    category: "PA",
  },
  {
    title: "Horizontal Water Source Heat Pump",
    description:
      "Uses renewable energy sources like ground water and surface water with highest ACOP up to 4.94",
    features: [
      "Uses ground water, surface water, and renewable energy sources",
      "Can be applied to water loop, water source, or ground water systems",
      "Multiple protections (high/low pressure, water leakage, temperature)",
      "Wired controller with sound, light, and code alarms",
      "Intelligent Control System with various control options",
      "Easy maintenance with access doors in three directions",
      "Convenient installation with pre-charged R410A refrigerant",
      "High-performance fan motor and optimized heat exchanger",
    ],
    popular: false,
    category: "PA",
  },
];

// VRV Products
const vrvProductCategories = [
  {
    title: "VRV S - Side Discharge",
    description:
      "Compact VRV system suitable for small offices and shops with capacity range from 4 HP to 12 HP",
    features: [
      "Suitable for small offices/shops",
      "Can connect up to 19 indoor units (12 HP model)",
      "Compact trunk-shaped design",
      "Space-saving installation",
      "Flexible piping design",
      "Long piping design (max 150m equivalent, 300m total)",
      "Wide operation temperature range",
    ],
    popular: true,
    category: "VRV",
  },
  {
    title: "VRV X",
    description:
      "Advanced VRV system with VRT technology, 4D Inverter System, and capacity up to 60 HP in increments of 2 HP",
    features: [
      "X'tra Power Savings with next-generation compressor",
      "X'tensive Range up to 60 HP (in increments of 2 HP)",
      "X'cellent Technology with 4D Inverter system",
      "X'tended Reliability with auto-optimisation refrigerant charging",
      "Long piping flexibility (max total length: 1000m)",
      "Max equivalent length: 190m",
      "Level difference: up to 90m",
      "Connection ratio: 50% – 200%",
    ],
    popular: true,
    category: "VRV",
  },
  {
    title: "VRV Home Series",
    description:
      "Centralized air conditioning for homes with capacity range 4 HP to 6 HP, can connect up to 8 indoor units",
    features: [
      "Centralized air conditioning for homes",
      "Can connect up to 8 indoor units",
      "Long piping design (up to 100m)",
      "Wide operation range (Cooling up to 49°C, Heating down to 0°C)",
      "Compact size, can be installed on balcony",
      "Flare connection based header pack (Brazing free installation)",
      "Single-phase power supply",
    ],
    popular: false,
    category: "VRV",
  },
];

// VRV Outdoor Units
const vrvOutdoorUnits = [
  {
    type: "VRV S - Side Discharge",
    capacity: "4 HP (11.2 kW)",
    model: "RXYMQ4",
    description:
      "Compact, space-saving with sufficient cooling capacity suitable for small offices/shops",
    features: [
      "Can connect up to 6 indoor units",
      "Neatly installed outside the office",
      "Compact design",
    ],
    specifications: {
      powerConsumption: "Variable",
      operatingRange: "Cooling up to 49°C",
      refrigerant: "R-410A",
      capacity: "4 HP (11.2 kW)",
    },
    category: "VRV",
  },
  {
    type: "VRV S - Side Discharge",
    capacity: "8 HP (22.4 kW)",
    model: "RXYMQ8",
    description:
      "Optimized for larger installations with long piping design capability",
    features: [
      "Supports up to 13 indoor units",
      "Long piping design (max 150m equivalent, 300m total)",
      "Can be installed on balcony/roof",
    ],
    specifications: {
      powerConsumption: "Variable",
      operatingRange: "Cooling up to 49°C",
      refrigerant: "R-410A",
      capacity: "8 HP (22.4 kW)",
    },
    category: "VRV",
  },
  {
    type: "VRV X - Single Type",
    capacity: "6 HP",
    model: "RXY(Q)6ARY6",
    description:
      "Single outdoor unit for VRV X system with advanced 4D Inverter technology",
    features: [
      "4D Inverter System",
      "VRT Smart Technology",
      "Auto-optimisation refrigerant charging",
    ],
    specifications: {
      powerConsumption: "Variable with VRT",
      operatingRange: "Extended range",
      refrigerant: "R-410A",
      capacity: "6 HP",
    },
    category: "VRV",
  },
  {
    type: "VRV X - Triple Type",
    capacity: "60 HP",
    model: "RXY(Q)60ARY6",
    description:
      "Maximum capacity triple outdoor units for large commercial buildings",
    features: [
      "Maximum configuration up to 60 HP",
      "Triple outdoor units for large buildings",
      "4D Inverter System",
    ],
    specifications: {
      powerConsumption: "Variable with VRT",
      operatingRange: "Extended range",
      refrigerant: "R-410A",
      capacity: "60 HP",
    },
    category: "VRV",
  },
];

// VRV Indoor Units Categories
const vrvIndoorUnits = [
  {
    category: "VRV Wall Mounted",
    units: [
      {
        name: "Wall Mounted Type",
        model: "FXAQ-A",
        capacity: "Various",
        features: [
          "Mounted on wall, easy installation",
          "Ideal for small rooms and offices",
          "Compact efficient air distribution",
        ],
        applications: ["Small Office", "Hotel Room", "Residential"],
      },
    ],
  },
  {
    category: "VRV Floor Standing",
    units: [
      {
        name: "Floor Standing Type",
        model: "FXNQ-A",
        capacity: "Various",
        features: [
          "Flexible placement",
          "Good for spaces without ceiling installation options",
          "High-efficiency floor-mounted cooling",
        ],
        applications: ["Large Office", "Showroom", "Retail"],
      },
      {
        name: "Concealed Floor Standing Type",
        model: "FXNQ-AE",
        capacity: "Various",
        features: [
          "Hidden installation for aesthetics",
          "Ideal for showrooms/offices",
          "Efficient concealed airflow",
        ],
        applications: ["Showroom", "Office", "Commercial"],
      },
    ],
  },
  {
    category: "VRV Ceiling Cassette",
    units: [
      {
        name: "Compact Multi Flow Cassette",
        model: "FXZQ-AMV1",
        capacity: "Various",
        features: [
          "Compact square design",
          "Multi-flow air distribution",
          "Compact, energy-efficient design",
        ],
        applications: ["Office", "Conference Room", "Reception"],
      },
      {
        name: "Round Flow Cassette",
        model: "FXFQ-AV1",
        capacity: "Various",
        features: [
          "Round flow design",
          "Ideal for uniform air conditioning in rooms",
          "360° air distribution efficiency",
        ],
        applications: ["Office", "Hotel", "Retail"],
      },
      {
        name: "4-Way Flow Ceiling Suspended Cassette",
        model: "FXUQ-AV1",
        capacity: "Various",
        features: [
          "4-way air distribution",
          "Slim design, compact ceiling mount",
          "Multi-directional airflow efficiency",
        ],
        applications: ["Large Office", "Hall", "Conference Room"],
      },
    ],
  },
  {
    category: "VRV Ducted",
    units: [
      {
        name: "Slim Ceiling Mounted Duct Type",
        model: "FXDQ-MA",
        capacity: "Various",
        features: [
          "Slim duct design for hidden installation",
          "Flexible duct connection",
          "Slim and efficient",
        ],
        applications: ["Office", "Commercial", "Hidden Installation"],
      },
      {
        name: "Ceiling Mounted Duct Type",
        model: "FXMQ-MA",
        capacity: "Various",
        features: [
          "Suitable for large open spaces",
          "Discreet duct installation",
          "High efficiency, powerful airflow",
        ],
        applications: ["Mall", "Factory", "Large Commercial"],
      },
    ],
  },
  {
    category: "VRV Specialized",
    units: [
      {
        name: "Clean Room Air Conditioner",
        model: "FBQ/FDQPE",
        capacity: "Various",
        features: [
          "Suitable for medical and cleanroom environments",
          "Maintains clean airflow",
          "High filtration efficiency",
        ],
        applications: ["Hospital", "Laboratory", "Cleanroom"],
      },
      {
        name: "Multi Cube (Spot AC)",
        model: "FQSDVAM",
        capacity: "Various",
        features: [
          "Narrow air conditioner for large open spaces",
          "Easy installation and service",
          "Spot cooling efficiency",
        ],
        applications: ["Warehouse", "Factory", "Large Hall"],
      },
    ],
  },
  {
    category: "VRV Home Series Indoor",
    units: [
      {
        name: "Slim Ceiling Mounted Duct (Drop-Ceiling)",
        model: "FXDRQ20PD/25PD/32PD",
        capacity: "0.7-1.1 HP",
        features: [
          "Compact design (only 700mm width, 23kg)",
          "Quiet operation (20-35 dB(A))",
          "Fits into false ceilings with only 240mm depth",
          "3-step airflow control",
        ],
        applications: ["Home", "Bedroom", "Living Room"],
      },
      {
        name: "Wall Mounted Type",
        model: "FXARQ20A-63A",
        capacity: "0.7-2.2 HP",
        features: [
          "Flat panel design harmonized with interior décor",
          "Easy to clean with single wipe",
          "Vertical auto-swing",
          "Automatic louvre closing when unit stops",
        ],
        applications: ["Home", "Bedroom", "Living Area"],
      },
    ],
  },
];

async function seedDaikinProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data (optional - remove if you want to keep existing data)
    console.log("Clearing existing data...");
    await ProductCategory.deleteMany({
      category: { $in: ["SA", "RA", "PA", "VRV"] },
    });
    await FeaturedModel.deleteMany({
      category: { $in: ["SA", "RA", "PA", "VRV"] },
    });
    await OutdoorUnit.deleteMany({
      category: { $in: ["SA", "RA", "PA", "VRV"] },
    });
    await IndoorUnitCategory.deleteMany({});

    // Seed SA Product Categories
    console.log("Seeding SA Product Categories...");
    await ProductCategory.insertMany(saProductCategories);

    // Seed RA Product Categories
    console.log("Seeding RA Product Categories...");
    await ProductCategory.insertMany(raProductCategories);

    // Seed PA Product Categories
    console.log("Seeding PA Product Categories...");
    await ProductCategory.insertMany(paProductCategories);

    // Seed VRV Product Categories
    console.log("Seeding VRV Product Categories...");
    await ProductCategory.insertMany(vrvProductCategories);

    // Seed SA Featured Models
    console.log("Seeding SA Featured Models...");
    await FeaturedModel.insertMany(saFeaturedModels);

    // Seed RA Featured Models
    console.log("Seeding RA Featured Models...");
    await FeaturedModel.insertMany(raFeaturedModels);

    // Seed VRV Outdoor Units
    console.log("Seeding VRV Outdoor Units...");
    await OutdoorUnit.insertMany(vrvOutdoorUnits);

    // Seed VRV Indoor Units
    console.log("Seeding VRV Indoor Units...");
    await IndoorUnitCategory.insertMany(vrvIndoorUnits);

    console.log("✅ All Daikin products seeded successfully!");
    console.log(`📊 Seeded:
    - ${
      saProductCategories.length +
      raProductCategories.length +
      paProductCategories.length +
      vrvProductCategories.length
    } Product Categories
    - ${saFeaturedModels.length + raFeaturedModels.length} Featured Models  
    - ${vrvOutdoorUnits.length} Outdoor Units
    - ${vrvIndoorUnits.length} Indoor Unit Categories`);
  } catch (error) {
    console.error("❌ Error seeding products:", error);
  } finally {
    await mongoose.connection.close();
    console.log("📝 Database connection closed");
  }
}

// Run the seeding function
seedDaikinProducts();
