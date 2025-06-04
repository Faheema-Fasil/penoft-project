const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.authenticate = async (req, res, next) => {
  try {
    const authRoutes = [
      
      "/api/profiles",
      "/api/locations",
      "/api/dashboard"
    ];

    if (!authRoutes.includes(req.path)) return next();

    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        message: "Authentication required. Please log in.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      ignoreExpiration: false,
    });

    const user = await User.findById(decoded._id);
    if (!user ) {
      return res.status(401).json({
        message: "Session expired. Please log in again.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);

    let message = "Please authenticate";
    if (error.name === "TokenExpiredError") {
      message = "Session expired. Please log in again.";
    } else if (error.name === "JsonWebTokenError") {
      message = "Invalid token. Please log in again.";
    }

    res.status(401).json({
      message,
    });
  }
};
