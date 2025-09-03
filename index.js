require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json({ limit: "50mb" })); // Increase JSON payload limit
app.use(express.urlencoded({ extended: true, limit: "50mb" })); // Increase URL-encoded payload limit
app.use(express.raw({ limit: "50mb", type: "application/octet-stream" })); // Handle raw binary data
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:8080", "http://127.0.0.1:8080"], // Frontend URLs
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Set-Cookie"],
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Products API routes
const productsRoutes = require("./routes/products");
app.use("/api/products", productsRoutes);

// ProductsPreview API routes
const productsPreviewRoutes = require("./routes/productsPreview");
app.use("/api/products-preview", productsPreviewRoutes);

// Services API route
const servicesRoutes = require("./routes/services");
app.use("/api/services", servicesRoutes);

// Offers API route
const offersRoutes = require("./routes/offers");
app.use("/api/offers", offersRoutes);

// Authentication routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Admin Products CRUD API route
const adminProductsRoutes = require("./routes/adminProducts");
const adminServicesRoutes = require("./routes/adminServices");
const adminOffersRoutes = require("./routes/adminOffers");
const authenticateAdmin = require("./middleware/auth");

// Protected admin routes
app.use("/api/admin/products", authenticateAdmin, adminProductsRoutes);
app.use("/api/admin/services", authenticateAdmin, adminServicesRoutes);
app.use("/api/admin/offers", authenticateAdmin, adminOffersRoutes);

app.get("/", (req, res) => {
  res.send("Astra Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
