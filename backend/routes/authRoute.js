const express = require("express");
const {
  createUser,
  loginUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
  blockUser,
  unBlockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPassword,
  resetPassword,
  loginAdminUser,
  getWishList,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupen,
  createOrder,
  getOrder,
  updateOrderStatus,
} = require("../controllers/userController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/login-admin", loginAdminUser);
router.post("/forgotPassword", forgotPassword);
router.post("/userCart", authMiddleware, userCart);
router.post("/applyCoupen", authMiddleware, applyCoupen);
router.post("/createOrder", authMiddleware, createOrder);

router.get("/getAllUser", authMiddleware, isAdmin, getAllUser);
router.get("/getUserById/:id", authMiddleware, getUserById);
router.get("/refreshToken", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishList);
router.get("/getUserCart", authMiddleware, getUserCart);
router.get("/getOrder", authMiddleware, getOrder);

router.put("/updateUser", authMiddleware, updateUser);
router.put("/blockUser/:id", authMiddleware, isAdmin, blockUser);
router.put("/unBLockUser/:id", authMiddleware, isAdmin, unBlockUser);
router.put("/updatePassword", authMiddleware, updatePassword);
router.put("/resetPassword/:token", resetPassword);
router.put("/saveAddress", authMiddleware, saveAddress);
router.put("/updateOrderStatus/:id", authMiddleware, updateOrderStatus);

router.delete("/deleteUser/:id", deleteUser);
router.delete("/emptyCart", authMiddleware, emptyCart);

module.exports = router;
