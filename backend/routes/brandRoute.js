const express = require("express");

const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const {
  getBrand,
  createBrand,
  getAllBrandCategories,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");

const router = express.Router();

router.get("/getBrand/:id", authMiddleware, isAdmin, getBrand);
router.get("/getAllBrand", getAllBrandCategories);

router.post("/createBrand", authMiddleware, isAdmin, createBrand);

router.put("/updateBrand/:id", authMiddleware, isAdmin, updateBrand);

router.delete("/deleteBrand/:id", authMiddleware, isAdmin, deleteBrand);

module.exports = router;
