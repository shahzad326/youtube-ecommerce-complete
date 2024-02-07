const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { validateMongoDbId } = require("../utils/validateMongodbId");
const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");
const fs = require("fs");

const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res, next) => {
  try {
    if (req.body.title) {
      let slug = slugify(req.body.title);

      const existingProduct = await Product.findOne({ slug });

      if (existingProduct) {
        return res.status(400).json({
          success: false,
          msg: "Product with this slug already exists",
        });
      }

      req.body.slug = slug;
    }
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      success: true,
      msg: "Product created successfully",
      newProduct,
    });
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getProduct = await Product.findById(id);

    if (!getProduct) {
      return res.status(404).json({
        success: false,
        msg: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      getProduct,
    });
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortByArray = req.query.sort.split(",");
      const sortBy = sortByArray.map((field) => {
        if (field.startsWith("-")) {
          return `-${field.substring(1)}`;
        }
        return field;
      });
      query = query.sort(sortBy.join(" "));
    } else {
      query = query.sort("-createdAt");
    }

    // Limiting the Fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",");
      const projection = fields.reduce((acc, field) => {
        if (field.startsWith("-")) {
          acc[field.substring(1)] = 0; // Exclude the field
        } else {
          acc[field] = 1; // Include the field
        }
        return acc;
      }, {});
      query = query.select(projection);
    } else {
      query = query.select("-__v"); // Exclude the "__v" field
    }

    // Pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This page does not exits");
    }

    const products = await query;

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );

    if (!updateProduct) {
      return res.status(404).json({
        success: false,
        msg: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Product updated successfully",
      updateProduct,
    });
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const checkProduct = await Product.findById(id);

    if (!checkProduct) {
      return res.status(404).json({
        success: false,
        msg: "Product not found",
      });
    }

    const deleteProduct = await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      msg: "Product Deleted successfully",
    });
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

const addtoWishList = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { prodId } = req.body;

  try {
    const user = await User.findById(_id);
    const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId);

    if (alreadyAdded) {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        msg: "Product removed from wishlist successfully",
        user: updatedUser,
      });
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        msg: "Product added to wishlist successfully",
        user: updatedUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
});

const ratings = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;

  try {
    const product = await Product.findById(prodId);
    const alreadyRated = product.ratings.find(
      (rating) => rating.postedBy.toString() === _id.toString()
    );

    if (alreadyRated) {
      await Product.updateOne(
        { "ratings.postedBy": _id },
        { $set: { "ratings.$.star": star, "ratings.$.comment": comment } }
      );
    } else {
      await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedBy: _id,
            },
          },
        },
        { new: true }
      );
    }

    const getAllRatings = await Product.findById(prodId);
    const totalRatings = getAllRatings.ratings.length;
    const ratingsSum = getAllRatings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    const actualRatings = Math.round(ratingsSum / totalRatings);

    const finalProduct = await Product.findByIdAndUpdate(
      prodId,
      { totalrating: actualRatings },
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: "Product rated successfully",
      finalProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
});

const uploadImages = asyncHandler(async (req, res, next) => {
  try {
    const uploader = async (path) => await cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    console.log(urls);
    const images = urls.map((file) => {
      return file;
    });

    res.json({ msg: "Images Uploaded", images });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteImages = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = cloudinaryDeleteImg(id, "images");
    res.json({ msg: "Images Deleted", deleted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  createProduct,
  getProductById,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addtoWishList,
  ratings,
  uploadImages,
  deleteImages,
};
