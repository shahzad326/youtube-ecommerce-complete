const express = require("express");

const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const {
  getEnquiry,
  createEnquiry,
  getAllEnquiryCategories,
  updateEnquiry,
  deleteEnquiry,
} = require("../controllers/enquiryController");

const router = express.Router();

router.get("/getEnquiry/:id", getEnquiry);
router.get("/getAllEnquiry", getAllEnquiryCategories);

router.post("/createEnquiry", createEnquiry);

router.delete("/deleteEnquiry/:id", deleteEnquiry);

router.put("/updateEnquiry/:id", authMiddleware, isAdmin, updateEnquiry);

module.exports = router;
