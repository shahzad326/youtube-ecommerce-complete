const express = require("express");

const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const {
  getColor,
  createColor,
  getAllColorCategories,
  updateColor,
  deleteColor,
} = require("../controllers/colorController");

const router = express.Router();

router.get("/getColor/:id", authMiddleware, isAdmin, getColor);
router.get("/getAllColor", authMiddleware, isAdmin, getAllColorCategories);

router.post("/createColor", authMiddleware, isAdmin, createColor);

router.put("/updateColor/:id", authMiddleware, isAdmin, updateColor);

router.delete("/deleteColor/:id", authMiddleware, isAdmin, deleteColor);

module.exports = router;
