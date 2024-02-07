const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "Category",
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },

    quantity: { type: Number, required: true },
    sold: {
      type: Number,
      default: 0,
    },
    images: [],
    color: [],
    tags: [],
    ratings: [
      {
        star: Number,
        comment: String,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      },
    ],
    totalrating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
