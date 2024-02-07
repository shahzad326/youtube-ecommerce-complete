const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        // Attach user data to the request for later use, if needed
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      // Handle token verification errors
      return res.status(401).json({
        msg: "Not authorized, token expires or is invalid. Please login again.",
      });
    }
  } else {
    // Handle missing token in the header
    return res.status(401).json({
      msg: "There is no token attached to the header.",
    });
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });

  if (adminUser.role !== "admin") {
    res.status(403).json({ error: "You are not an Admin" });
    return;
  }

  next();
});

module.exports = { authMiddleware, isAdmin };
