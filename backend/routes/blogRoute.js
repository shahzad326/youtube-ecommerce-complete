const express = require("express");

const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadImages,
} = require("../controllers/blogController");
const { blogImageResize, uploadPhoto } = require("../middleware/uploadImage");

const router = express.Router();

router.get("/getBlog/:id", authMiddleware, getBlog);
router.get("/getAllBlogs", getAllBlogs);

router.post("/createBlog", authMiddleware, isAdmin, createBlog);

router.put("/updateBlog/:id", authMiddleware, updateBlog);
router.put("/likeBlog/:blogid", authMiddleware, likeBlog);
router.put("/dislikeBlog/:blogid", authMiddleware, dislikeBlog);
router.put(
  "/uploadImage/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  blogImageResize,
  uploadImages
);

router.delete("/deleteBlog/:id", authMiddleware, deleteBlog);

module.exports = router;
