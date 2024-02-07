const express = require("express");

const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const {
  getAllBrandCategories,
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
} = require("../controllers/brandController");

const router = express.Router();

router.get("/getBrand/:id", authMiddleware, isAdmin, getBrand);
router.get(
  "/getAllBlogCategory",
  authMiddleware,
  isAdmin,
  getAllBrandCategories
);

router.post("/createBrand", authMiddleware, isAdmin, createBrand);

router.put("/updateBrand/:id", authMiddleware, isAdmin, updateBrand);

router.delete("/deleteBRand/:id", authMiddleware, isAdmin, deleteBrand);

module.exports = router;
