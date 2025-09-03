const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const authenticateAdmin = async (req, res, next) => {
  try {
    // Try to get token from Authorization header first, then from cookies
    let token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      token = req.cookies?.adminToken;
    }

    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin || !admin.isActive) {
      return res
        .status(401)
        .json({ error: "Invalid token or admin not active" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authenticateAdmin;
