const express = require("express");
const {
  createProduct,
  getProductById,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addtoWishList,
  ratings,
} = require("../controllers/productController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/createProduct", authMiddleware, isAdmin, createProduct);

router.get("/getProductById/:id", getProductById);
router.get("/getAllProduct", getAllProduct);

router.put("/updateProduct/:id", authMiddleware, isAdmin, updateProduct);
router.put("/addtoWishList", authMiddleware, addtoWishList);
router.put("/ratings", authMiddleware, ratings);

router.delete("/deleteProduct/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
