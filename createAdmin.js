const mongoose = require("mongoose");
const Admin = require("./models/Admin");
require("dotenv").config();

async function createFirstAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Check if any admin exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      console.log("Admin user already exists!");
      process.exit(0);
    }

    // Create first admin
    const admin = new Admin({
      username: "admin",
      password: "admin123", // This will be hashed automatically
      name: "System Administrator",
      email: "admin@astraairconditioning.com",
    });

    await admin.save();
    console.log("First admin user created successfully!");
    console.log("Username: admin");
    console.log("Password: admin123");
    console.log("Please change the password after first login!");
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    mongoose.connection.close();
  }
}

createFirstAdmin();
