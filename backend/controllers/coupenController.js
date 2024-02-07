const Coupen = require("../models/coupenModel");

const asyncHandler = require("express-async-handler");
const { validateMongoDbId } = require("../utils/validateMongodbId");

const createCoupen = asyncHandler(async (req, res, next) => {
  try {
    const newCoupen = await Coupen.create(req.body);
    res.status(200).json({
      scuess: "true",
      msg: "Coupen created successfully",
      newCoupen,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCoupen = asyncHandler(async (req, res, next) => {
  try {
    const allCoupen = await Coupen.find();

    if (allCoupen.length === 0) {
      res.status(200).json({
        success: true,
        msg: "No Coupen  found",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        msg: "All Coupen retrieved successfully",

        data: allCoupen,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const updateCoupen = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedCoupen = await Coupen.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCoupen) {
      res.status(404).json({
        success: false,
        msg: "Coupen not found with the given ID",
      });
    } else {
      res.status(200).json({
        success: true,
        msg: " Coupen updated successfully",
        updatedCoupen,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCoupen = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Find the blog by ID
    const coupen = await Coupen.findById(id);

    if (!coupen) {
      return res.status(404).json({
        success: false,
        msg: "coupen not found",
      });
    }

    // Delete the blog
    await Coupen.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      msg: "Coupen deleted successfully",
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

module.exports = {
  createCoupen,
  getAllCoupen,
  updateCoupen,
  deleteCoupen,
};
