const jwt = require("jsonwebtoken");
const Blacklist = require("../models/blacklist.model.js");

const authUser = async (req, res, next) => {
  const token = req.cookies.token;

  //   Check if token is present
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized, token not found",
      success: false,
    });
  }

  //   Check if token is blacklisted
  const isTokenBlacklisted = await Blacklist.findOne({ token });

  if (isTokenBlacklisted) {
    return res.status(401).json({
      message: "Unauthorized, token is invalid",
      success: false,
    });
  }

  try {
    // Verify token and attach user info to request object
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized, invalid token",
      success: false,
    });
  }
};

module.exports = { authUser };
