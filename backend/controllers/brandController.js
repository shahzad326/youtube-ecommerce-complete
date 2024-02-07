const Brand = require("../models/brandModel");

const asyncHandler = require("express-async-handler");
const { validateMongoDbId } = require("../utils/validateMongodbId");

const createBrand = asyncHandler(async (req, res, next) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.status(200).json({
      scuess: "true",
      msg: "Brand created successfully",
      newBrand,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBrand) {
      res.status(404).json({
        success: false,
        msg: "Brand not found with the given ID",
      });
    } else {
      res.status(200).json({
        success: true,
        msg: "Brand Category updated successfully",
        updatedBrand,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findBrand = await Brand.findById(id);
    if (!findBrand) {
      res.status(200).json({
        success: "true",
        msg: "Brand not found or already deleted",
      });
    }
    const deletedBrand = await Brand.findByIdAndDelete(id);
    res.status(200).json({
      scuess: "true",
      msg: "Brand Deleted successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getBrand = await Brand.findById(id);
    if (!getBrand) {
      res.status(200).json({
        success: "false",
        msg: "Brand not found ",
      });
    } else {
      res.status(200).json({
        success: "true",
        getBrand,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBrandCategories = asyncHandler(async (req, res, next) => {
  try {
    const allBrand = await Brand.find();

    if (allBrand.length === 0) {
      res.status(200).json({
        success: true,
        msg: "No Brand  found",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        msg: "All Brand retrieved successfully",
        data: allBrand,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getAllBrandCategories,
};
