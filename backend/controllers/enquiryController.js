const Enquiry = require("../models/enquiryModel");

const asyncHandler = require("express-async-handler");
const { validateMongoDbId } = require("../utils/validateMongodbId");

const createEnquiry = asyncHandler(async (req, res, next) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
    res.status(200).json({
      scuess: "true",
      msg: "Enquiry created successfully",
      newEnquiry,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteEnquiry = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findEnquiry = await Enquiry.findById(id);
    if (!findEnquiry) {
      res.status(200).json({
        success: "true",
        msg: "Enquiry not found or already deleted",
      });
    }
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
    res.status(200).json({
      scuess: "true",
      msg: "Enquiry Deleted successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateEnquiry = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedEnquiry) {
      res.status(404).json({
        success: false,
        msg: "Enquiry not found with the given ID",
      });
    } else {
      res.status(200).json({
        success: true,
        msg: "Enquiry Status updated successfully",
        updatedEnquiry,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getEnquiry = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getEnquiry = await Enquiry.findById(id);
    if (!getEnquiry) {
      res.status(200).json({
        success: "false",
        msg: "Enquiry not found ",
      });
    } else {
      res.status(200).json({
        success: "true",
        getEnquiry,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getAllEnquiryCategories = asyncHandler(async (req, res, next) => {
  try {
    const allEnquiry = await Enquiry.find();

    if (allEnquiry.length === 0) {
      res.status(200).json({
        success: true,
        msg: "No Enquiry  found",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        msg: "All Enquiry retrieved successfully",
        data: allEnquiry,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getAllEnquiryCategories,
};
