const BlogCategory = require("../models/blogCategoryModel");

const asyncHandler = require("express-async-handler");
const { validateMongoDbId } = require("../utils/validateMongodbId");

const createBlogCategory = asyncHandler(async (req, res, next) => {
  try {
    const newCategory = await BlogCategory.create(req.body);
    res.status(200).json({
      scuess: "true",
      msg: "Blog Category created successfully",
      newCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlogCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedBlogCategory = await BlogCategory.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedBlogCategory) {
      res.status(404).json({
        success: false,
        msg: "Blog category not found with the given ID",
      });
    } else {
      res.status(200).json({
        success: true,
        msg: "Blog Category updated successfully",
        updatedBlogCategory,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBlogCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findBlogCategory = await BlogCategory.findById(id);
    if (!findBlogCategory) {
      res.status(200).json({
        success: "true",
        msg: "Blog Category not found or already deleted",
      });
    }
    const deletedBlogCategory = await BlogCategory.findByIdAndDelete(id);
    res.status(200).json({
      scuess: "true",
      msg: "Blog Category Deleted successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getBlogCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getBlogCategory = await BlogCategory.findById(id);
    if (!getBlogCategory) {
      res.status(200).json({
        success: "false",
        msg: "Blog not found ",
      });
    } else {
      res.status(200).json({
        success: "true",
        getBlogCategory,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBlogCategories = asyncHandler(async (req, res, next) => {
  try {
    const allBlogCategories = await BlogCategory.find();

    if (allBlogCategories.length === 0) {
      res.status(200).json({
        success: true,
        msg: "No blog categories found",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        msg: "All blog categories retrieved successfully",
        data: allBlogCategories,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  getBlogCategory,
  getAllBlogCategories,
};
