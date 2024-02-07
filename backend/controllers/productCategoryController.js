const ProductCategory = require("../models/productCategoryModel");

const asyncHandler = require("express-async-handler");
const { validateMongoDbId } = require("../utils/validateMongodbId");
const { validate } = require("../models/userModel");

const createProductCategory = asyncHandler(async (req, res, next) => {
  try {
    const newCategory = await ProductCategory.create(req.body);
    res.status(200).json({
      scuess: "true",
      msg: "Category created successfully",
      newCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateProductCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedCategory = await ProductCategory.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      scuess: "true",
      msg: "Category updated successfully",
      updatedCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProductCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findProductCategory = await ProductCategory.findById(id);
    if (!findProductCategory) {
      res.status(200).json({
        success: "true",
        msg: "Product Category not found or already deleted",
      });
    }
    const deletedProductCategory = await ProductCategory.findByIdAndDelete(id);
    res.status(200).json({
      scuess: "true",
      msg: "Product Category Deleted successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getProductCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getProductCategory = await ProductCategory.findById(id);
    if (!getProductCategory) {
      res.status(200).json({
        success: "false",
        msg: "Product not found ",
      });
    } else {
      res.status(200).json({
        success: "true",
        getProductCategory,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});
const getAllProductCategories = asyncHandler(async (req, res, next) => {
  try {
    const allProductCategories = await ProductCategory.find();

    if (allProductCategories.length === 0) {
      res.status(200).json({
        success: true,
        msg: "No product categories found",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        msg: "All product categories retrieved successfully",
        data: allProductCategories,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getProductCategory,
  getAllProductCategories,
};
