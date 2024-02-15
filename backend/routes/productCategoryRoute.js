const express = require("express");

const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const {
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getProductCategory,
  getAllProductCategories,
} = require("../controllers/productCategoryController");

const router = express.Router();

router.get(
  "/getProductCategory/:id",
  authMiddleware,
  isAdmin,
  getProductCategory
);
router.get("/getAllProductCategory", getAllProductCategories);

router.post(
  "/createProductCategory",
  authMiddleware,
  isAdmin,
  createProductCategory
);

router.put(
  "/updateProductCategory/:id",
  authMiddleware,
  isAdmin,
  updateProductCategory
);

router.delete(
  "/deleteProductCategory/:id",
  authMiddleware,
  isAdmin,
  deleteProductCategory
);

module.exports = router;
