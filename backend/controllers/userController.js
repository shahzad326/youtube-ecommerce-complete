const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupen = require("../models/coupenModel");
const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const { validateMongoDbId } = require("../utils/validateMongodbId");
const { generaterefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("./emailController");
const crypto = require("crypto");
const uniqid = require("uniqid");

const createUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, mobile, password } = req.body;

  const findUser = await User.findOne({ email });

  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error(`User Already exists`);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });

  if (findUser && (await findUser.isPasswordMatch(password))) {
    const refreshToken = await generaterefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error(`Invalid Credentials`);
  }
});

const loginAdminUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findAdminUser = await User.findOne({ email });
  if (findAdminUser.role !== "admin") {
    throw new Error("Not Authorized");
  }

  if (findAdminUser && (await findAdminUser.isPasswordMatch(password))) {
    const refreshToken = await generaterefreshToken(findAdminUser?._id);
    const updateAdminUser = await User.findByIdAndUpdate(
      findAdminUser.id,
      {
        refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdminUser?._id,
      firstname: findAdminUser?.firstname,
      lastname: findAdminUser?.lastname,
      email: findAdminUser?.email,
      mobile: findAdminUser?.mobile,
      token: generateToken(findAdminUser?._id),
    });
  } else {
    throw new Error(`Invalid Credentials`);
  }
});

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  // console.log(cookie);
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookie");
  const refreshToken = cookie.refreshToken;
  // console.log(refreshToken);
  const user = await User.findOne({ refreshToken });
  if (!user)
    throw new Error("No Refresh token present in db or matched not found");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is someThing wrong with refresh Token");
    }
    const accesToken = generateToken(user?._id);
    res.status(200).json({ accesToken });
  });
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.refreshToken) {
    throw new Error("No Refresh token in Cookie");
  }

  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });

  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res
      .status(204)
      .json({ msg: "User not found or already logged out" });
  }

  await User.findOneAndUpdate(
    { refreshToken: refreshToken },
    {
      refreshToken: "",
    }
  );

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  return res.status(200).json({ msg: "User logged out successfully" });
});

const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUser = await User.find();
    const totalUser = await User.countDocuments();
    res.status(200).json({
      success: "true",
      totalUser,
      getUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getUser = await User.findById(id);
    res.json(getUser);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    // Check if the user exists
    const userToDelete = await User.findById(id);

    if (!userToDelete) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    // If the user exists, proceed with deletion
    const deletedUser = await User.findByIdAndDelete(id);

    res.json({
      msg: "User Deleted Successfully",
      deletedUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongoDbId(id);
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      { new: true }
    );
    res.json({
      Msg: "User Updated Successfully",
      updateUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    // Check if the user exists
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        error: "User not found",
      });
      return;
    }

    // Check if the user is already blocked
    if (user.isBlocked) {
      res.status(400).json({
        error: "User is already blocked",
      });
      return;
    }

    // Update the user to block
    const blockedUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );

    res.json({
      msg: "User blocked successfully",
      blockedUser,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

const unBlockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    // Check if the user exists
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        error: "User not found",
      });
      return;
    }

    // Check if the user is already unblocked
    if (!user.isBlocked) {
      res.status(400).json({
        error: "User is already unblocked",
      });
      return;
    }

    // Update the user to unblock
    const unblockUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );

    res.status(200).json({
      msg: "User unblocked successfully",
      unblockUser,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

const updatePassword = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { password, confirmPassword } = req.body;
  validateMongoDbId(_id);

  try {
    const user = await User.findById({ _id });

    if (password === confirmPassword) {
      // Update password only if both new and confirmed passwords exist and match
      user.password = password;
      const updatedUser = await user.save();

      res.status(200).json({
        success: true,
        msg: "Password updated successfully",
        user: updatedUser,
      });
    } else {
      res.status(400).json({
        success: false,
        msg: " password and confirmed password do not match",
      });
    }
  } catch (error) {
    // Handle any errors that occur during the update process
    res.status(500).json({
      success: false,
      msg: "Error updating password",
      error: error.message,
    });
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with given email address");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetUrl = `Hi, Please Follow this Link to reset your password. This link is valid till 10 Minutes from now <a href="http://localhost:5000/api/user/resetPassword/${token}"> Click Here </a>`;
    // Rest of your code...
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      html: resetUrl,
    };
    sendEmail(data);
    res.status(200).json({
      success: "true",
      msg: "Email has been send to user Successfully",
      token,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.json({
      success: false,
      msg: "Error generating password reset link",
      error: error.message,
    });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  // Hash the token using SHA-256
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  try {
    // Find the user by the hashed token and check if the token is still valid
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error("Invalid or expired token. Please try again.");
    }

    // Check if the provided password and confirmPassword match
    if (password !== confirmPassword) {
      throw new Error("Password and confirm password do not match.");
    }

    // Update the user's password and clear the password reset fields
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    // Save the updated user
    await user.save();

    res.status(200).json({
      success: true,
      msg: "Password reset successfully",
      user: user,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      msg: "Error resetting password",
      error: error.message,
    });
  }
});

const getWishList = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.status(200).json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const findUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      { new: true }
    );
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

const userCart = asyncHandler(async (req, res, next) => {
  const { cart } = req.body;
  const { _id } = req.user;

  // Validate user ID
  validateMongoDbId(_id);

  try {
    let products = [];
    const user = await User.findById(_id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let alreadyExistCart = await Cart.findOne({ orderBy: user._id });

    // If cart already exists, update it; otherwise, create a new one
    if (!alreadyExistCart) {
      alreadyExistCart = new Cart({ orderBy: user._id });
    }

    // Preserve existing products if updating the cart
    if (alreadyExistCart.products.length > 0) {
      products = alreadyExistCart.products;
    }

    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;

      let getPrice = await Product.findById(cart[i]._id).select("price").exec();

      // Check if the product exists
      if (!getPrice) {
        return res.status(404).json({ error: "Product not found" });
      }

      object.price = getPrice.price;
      products.push(object);
    }

    // Calculate cartTotal based on updated products
    alreadyExistCart.cartTotal = products.reduce(
      (total, product) => total + product.price * product.count,
      0
    );

    // Update products array
    alreadyExistCart.products = products;

    await alreadyExistCart.save();

    res
      .status(200)
      .json({ msg: "Cart updated successfully", cart: alreadyExistCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getUserCart = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  // Validate user ID
  validateMongoDbId(_id);

  try {
    const user = await User.findById(_id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userCart = await Cart.findOne({ orderBy: user._id }).populate({
      path: "products.product", // Ensure the correct path based on your schema
    });

    // If the user has no cart, you can return an empty array or handle it accordingly
    if (!userCart) {
      return res.status(404).json({ msg: "User has no cart" });
    }

    res
      .status(200)
      .json({ msg: "User cart retrieved successfully", cart: userCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const emptyCart = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const user = await User.findById(_id);
    const cart = await Cart.findOneAndDelete({ orderBy: user._id });

    if (!cart) {
      return res.status(404).json({ msg: "Cart is already empty" });
    }

    res.json({ msg: "Cart emptied successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const applyCoupen = asyncHandler(async (req, res, next) => {
  const { coupen } = req.body; // Corrected the variable name from coupen to coupon
  const { _id } = req.user;

  validateMongoDbId(_id);

  const validCoupon = await Coupen.findOne({ name: coupen });
  if (!validCoupon) {
    throw new Error("Invalid Coupon");
  }

  const user = await User.findOne({ _id });
  let { cartTotal } = await Cart.findOne({ orderBy: user._id }).populate({
    path: "products.product",
  });
  console.log(cartTotal);
  console.log(validCoupon.discount);
  // Calculate total after applying the discount
  let totalAfterDiscount = cartTotal - (cartTotal * validCoupon.discount) / 100;

  console.log(totalAfterDiscount);

  6000 - (600 * 100) / 100;
  // Update the totalAfterDiscount field in the Cart document
  await Cart.findOneAndUpdate(
    { orderBy: user._id },
    { totalAfterDiscount },
    { new: true }
  );

  res.json(totalAfterDiscount);
});

const createOrder = asyncHandler(async (req, res, next) => {
  const { COD, coupenApplid } = req.body;
  const { _id } = req.user;

  validateMongoDbId(_id);

  try {
    if (!COD) {
      throw new Error("Create Cash Order Failed");
    }

    const user = await User.findById(_id);
    const userCart = await Cart.findOne({ orderBy: user._id });

    if (!userCart || userCart.products.length === 0) {
      throw new Error("Empty Cart. Cannot create order without products.");
    }

    let finalAmount = 0;

    if (coupenApplid && userCart.totalAfterDiscount) {
      console.log(userCart.totalAfterDiscount);
      finalAmount = parseFloat(userCart.totalAfterDiscount).toFixed(2);
    } else {
      finalAmount = parseFloat(userCart.cartTotal).toFixed(2);
    }

    const newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmount,
        status: "Cash On Delivery",
        currency: "PKR",
      },
      orderBy: user._id,
      orderStatus: "Cash on Delivery",
    }).save();

    const update = userCart.products.map((item) => ({
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    }));

    const updated = await Product.bulkWrite(update, {});

    // Clear the user's cart after the order is placed
    await Cart.findOneAndUpdate(
      { orderBy: user._id },
      { $set: { products: [], cartTotal: 0, totalAfterDiscount: 0 } },
      { new: true }
    );

    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

const getOrder = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const userorders = await Order.findOne({ orderBy: _id })
      .populate({
        path: "products.product", // Ensure the correct path based on your schema
      })
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});

const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findOrder = await Order.findByIdAndUpdate(
      id,
      { orderStatus: status, paymentIntent: { status: status } },
      { new: true }
    );
    res.json(findOrder);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUser,
  loginAdminUser,
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
  getWishList,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupen,
  createOrder,
  getOrder,
  updateOrderStatus,
};
