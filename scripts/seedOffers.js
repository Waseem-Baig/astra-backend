require("dotenv").config();
const mongoose = require("mongoose");
const Offer = require("../models/Offer");
const OfferBenefit = require("../models/OfferBenefit");

const offers = [
  {
    title: "Summer Special Offer",
    discount: "Up to 25% OFF",
    description: "Get huge discounts on split ACs with free installation",
    validity: "Valid till 31st August 2024",
    features: [
      "Free Installation",
      "2 Year Extended Warranty",
      "Free Annual Maintenance",
    ],
    popular: true,
  },
  {
    title: "VRV System Deal",
    discount: "₹50,000 OFF",
    description: "Special pricing on commercial VRV systems",
    validity: "Limited time offer",
    features: ["Professional Installation", "5 Year Warranty", "24x7 Support"],
    popular: false,
  },
  {
    title: "Bulk Purchase Discount",
    discount: "Extra 15% OFF",
    description: "For orders of 10+ units",
    validity: "Year-round offer",
    features: ["Volume Discount", "Priority Service", "Dedicated Support"],
    popular: false,
  },
];

const benefits = [
  {
    title: "Free Installation",
    description: "Professional installation by certified technicians",
  },
  {
    title: "Extended Warranty",
    description: "Up to 5 years comprehensive warranty coverage",
  },
  {
    title: "Annual Maintenance",
    description: "Free annual maintenance for first 2 years",
  },
  {
    title: "Best Prices",
    description: "Guaranteed lowest prices in the market",
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Offer.deleteMany();
  await OfferBenefit.deleteMany();
  await Offer.insertMany(offers);
  await OfferBenefit.insertMany(benefits);
  console.log("Offers data seeded successfully");
  mongoose.disconnect();
}

seed();
