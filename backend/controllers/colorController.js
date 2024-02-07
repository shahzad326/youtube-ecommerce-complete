const Color = require("../models/colorModel");

const asyncHandler = require("express-async-handler");
const { validateMongoDbId } = require("../utils/validateMongodbId");

const createColor = asyncHandler(async (req, res, next) => {
  try {
    const newColor = await Color.create(req.body);
    res.status(200).json({
      scuess: "true",
      msg: "Color created successfully",
      newColor,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateColor = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedColor) {
      res.status(404).json({
        success: false,
        msg: "Color not found with the given ID",
      });
    } else {
      res.status(200).json({
        success: true,
        msg: "Color Category updated successfully",
        updatedColor,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const deleteColor = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findColor = await Color.findById(id);
    if (!findColor) {
      res.status(200).json({
        success: "true",
        msg: "Color not found or already deleted",
      });
    }
    const deletedColor = await Color.findByIdAndDelete(id);
    res.status(200).json({
      scuess: "true",
      msg: "Color Deleted successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getColor = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getColor = await Color.findById(id);
    if (!getColor) {
      res.status(200).json({
        success: "false",
        msg: "Color not found ",
      });
    } else {
      res.status(200).json({
        success: "true",
        getColor,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getAllColorCategories = asyncHandler(async (req, res, next) => {
  try {
    const allColor = await Color.find();

    if (allColor.length === 0) {
      res.status(200).json({
        success: true,
        msg: "No Color  found",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        msg: "All Color retrieved successfully",
        data: allColor,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getAllColorCategories,
};
