const mongoose = require("mongoose");

var enquiryModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    stauts: {
      type: String,
      default: "Submitted",
      enum: ["Submitted", "Contacted", "In Progress"],
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Enquiry", enquiryModel);
