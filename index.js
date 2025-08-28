require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

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

// Admin Products CRUD API route
const adminProductsRoutes = require("./routes/adminProducts");
const adminServicesRoutes = require("./routes/adminServices");
const adminOffersRoutes = require("./routes/adminOffers");
app.use("/api/admin/products", adminProductsRoutes);
app.use("/api/admin/services", adminServicesRoutes);
app.use("/api/admin/offers", adminOffersRoutes);

app.get("/", (req, res) => {
  res.send("Astra Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
