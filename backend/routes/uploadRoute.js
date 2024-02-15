const express = require("express");
const {
  uploadImages,
  deleteImages,
} = require("../controllers/uploadController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const {
  uploadPhoto,
  productImageResize,
} = require("../middleware/uploadImage");

const router = express.Router();

router.post(
  "/uploadImage",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImageResize,
  uploadImages
);

router.delete("/deleteImages/:id", deleteImages);

module.exports = router;
