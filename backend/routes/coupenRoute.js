const express = require("express");

const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const {
  createCoupen,
  getAllCoupen,
  updateCoupen,
  deleteCoupen,
} = require("../controllers/coupenController");

const router = express.Router();

router.post("/createCoupen", authMiddleware, isAdmin, createCoupen);

router.get("/getAllCoupen", authMiddleware, isAdmin, getAllCoupen);

router.put("/updateCoupen/:id", authMiddleware, isAdmin, updateCoupen);

router.delete("/deleteCoupen/:id", authMiddleware, isAdmin, deleteCoupen);

module.exports = router;
