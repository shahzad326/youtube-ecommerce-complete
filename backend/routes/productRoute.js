const express = require("express");
const {
  createProduct,
  getProductById,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addtoWishList,
  ratings,
  uploadImages,
  deleteImages,
} = require("../controllers/productController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const {
  uploadPhoto,
  productImageResize,
} = require("../middleware/uploadImage");

const router = express.Router();

router.post("/creteProduct", authMiddleware, isAdmin, createProduct);

router.get("/getProductById/:id", getProductById);
router.get("/getAllProduct", getAllProduct);

router.put("/updateProduct/:id", authMiddleware, isAdmin, updateProduct);
router.put("/addtoWishList", authMiddleware, addtoWishList);
router.put("/ratings", authMiddleware, ratings);
router.put(
  "/uploadImage",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImageResize,
  uploadImages
);

router.delete("/deleteProduct/:id", authMiddleware, isAdmin, deleteProduct);
router.delete("/deleteImages/:id", authMiddleware, deleteImages);

module.exports = router;
