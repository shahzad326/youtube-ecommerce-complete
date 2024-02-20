const express = require("express");

const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const {
  getBlogCategory,
  getAllBlogCategories,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
} = require("../controllers/blogCategoryController");

const router = express.Router();

router.get("/getBlogCategory/:id", authMiddleware, isAdmin, getBlogCategory);
router.get(
  "/getAllBlogCategory",

  getAllBlogCategories
);

router.post("/createBlogCategory", authMiddleware, isAdmin, createBlogCategory);

router.put(
  "/updateBlogCategory/:id",
  authMiddleware,
  isAdmin,
  updateBlogCategory
);

router.delete(
  "/deleteBlogCategory/:id",
  authMiddleware,
  isAdmin,
  deleteBlogCategory
);

module.exports = router;
