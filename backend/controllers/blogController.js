const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { validateMongoDbId } = require("../utils/validateMongodbId");
const cloudinaryUploadImage = require("../utils/cloudinary");
const fs = require("fs");

const createBlog = asyncHandler(async (req, res, next) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(200).json({
      scuess: "true",
      msg: "Blog created successfully",
      newBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    // Check if the blog with the specified ID exists
    const existingBlog = await Blog.findById(id);

    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        msg: "Blog not found",
      });
    }

    // Update the existing blog with the request body
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      success: true,
      msg: "Blog updated successfully",
      updateBlog: updatedBlog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Error updating blog",
      error: error.message,
    });
  }
});

const getBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    // Retrieve the blog with the specified ID
    const blog = await Blog.findById(id).populate("likes").populate("dislikes");

    if (!blog) {
      return res.status(404).json({
        success: false,
        msg: "Blog not found",
      });
    }

    // Update the number of views
    const updateViews = await Blog.findByIdAndUpdate(
      id,
      { $inc: { numViews: 1 } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: "OK",
      blog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Error fetching or updating blog",
      error: error.message,
    });
  }
});

const getAllBlogs = asyncHandler(async (req, res, next) => {
  try {
    const allBlogs = await Blog.find().populate("likes").populate("dislikes");
    const countBlogs = await Blog.countDocuments();

    if (countBlogs === 0) {
      return res.status(404).json({
        success: false,
        msg: "No blogs found",
      });
    }

    res.status(200).json({
      success: true,
      countBlogs,
      allBlogs,
      msg: "Blogs retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Error fetching blogs",
      error: error.message,
    });
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Find the blog by ID
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        msg: "Blog not found",
      });
    }

    // Delete the blog
    await Blog.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      msg: "Blog deleted successfully",
    });
  } catch {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Error fetching blogs",
      error: error.message,
    });
  }
});

const likeBlog = asyncHandler(async (req, res, next) => {
  const { blogid } = req.params;
  validateMongoDbId(blogid);

  try {
    // Find the Blog which you want to like
    const blog = await Blog.findById(blogid);

    if (!blog) {
      return res.status(404).json({
        success: false,
        msg: "Blog not found",
      });
    }

    // Find the Login User
    const loginUserId = req?.user?._id;

    // Find if the user has liked or disliked the blog
    const isLiked = blog?.likes?.includes(loginUserId);
    const isDisliked = blog?.dislikes?.includes(loginUserId);

    if (isDisliked) {
      // If the user has already disliked, remove the dislike
      blog.dislikes.pull(loginUserId);
      blog.isDisliked = false;
    }

    if (isLiked) {
      // If the user has already liked, remove the like (unlike)
      blog.likes.pull(loginUserId);
      blog.isLiked = false;
      // Save the updated blog
      const updatedBlog = await blog.save();

      res.status(200).json({
        success: true,
        msg: "Blog unliked successfully",
        blog: updatedBlog,
      });
    } else {
      // If the user has not liked, add the like
      blog.likes.push(loginUserId);
      blog.isLiked = true;
      // Save the updated blog
      const updatedBlog = await blog.save();

      res.status(200).json({
        success: true,
        msg: "Blog liked successfully",
        blog: updatedBlog,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Error liking/unliking the blog",
      error: error.message,
    });
  }
});

const dislikeBlog = asyncHandler(async (req, res, next) => {
  const { blogid } = req.params;
  validateMongoDbId(blogid);

  try {
    // Find the Blog which you want to dislike
    const blog = await Blog.findById(blogid);

    if (!blog) {
      return res.status(404).json({
        success: false,
        msg: "Blog not found",
      });
    }

    // Find the Login User
    const loginUserId = req?.user?._id;

    // Find if the user has liked or disliked the blog
    const isLiked = blog?.likes?.includes(loginUserId);
    const isDisliked = blog?.dislikes?.includes(loginUserId);

    if (isLiked) {
      // If the user has already liked, remove the like
      blog.likes.pull(loginUserId);
      blog.isLiked = false;
    }

    if (isDisliked) {
      // If the user has already disliked, remove the dislike (undislike)
      blog.dislikes.pull(loginUserId);
      blog.isDisliked = false;
      // Save the updated blog
      const updatedBlog = await blog.save();

      res.status(200).json({
        success: true,
        msg: "Blog undisliked successfully",
        blog: updatedBlog,
      });
    } else {
      // If the user has not disliked, add the dislike
      blog.dislikes.push(loginUserId);
      blog.isDisliked = true;
      // Save the updated blog
      const updatedBlog = await blog.save();

      res.status(200).json({
        success: true,
        msg: "Blog disliked successfully",
        blog: updatedBlog,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Error disliking/undisliking the blog",
      error: error.message,
    });
  }
});

const uploadImages = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const uploader = async (path) =>
      await cloudinaryUploadImage(path, "images");
    const urls = [];
    const files = req.files;
    console.log(files, "Files");
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    console.log(urls);
    const findProduct = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls,
      },
      { new: true }
    );

    res.json({ msg: "Images Uploaded", findProduct });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadImages,
};
