const express = require("express");
const wishlistRouter = express.Router();
const { Wishlist } = require("../models/wishlist.model");

wishlistRouter
  .route("/:userId")
  .get(async (req, res) => {
    try {
      const { userId } = req.params;
      const wishlist = await Wishlist.findById(userId).populate("products._id");

      const wishlistItem = wishlist.products.map((item) => {
        return { ...item._id._doc };
      });

      res.json({ success: true, wishlist: wishlistItem });
    } catch (error) {
      res
        .status(404)
        .json({ success: false, message: "unable to retrieve wishlist" });
    }
  })

  .post(async (req, res) => {
    try {
      const { userId } = req.params;
      let { product } = req.body;

      const wishlist = await Wishlist.findById(userId);
      wishlist.products.push(product);
      const savedWishlist = await wishlist.save();
      res.json({
        success: true,
        wishlist: savedWishlist,
        message: "product added successfully to the cart",
      });
    } catch (error) {
      res
        .status(404)
        .json({
          success: false,
          message: "unable to add product to the wishlist",
        });
    }
  });

wishlistRouter.route("/:userId/:productId").delete(async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const wishlist = await Wishlist.findById(userId);
    let productToBeDeleted = wishlist.products.find(
      (product) => product._id.toString() === productId
    );

    wishlist.products.pop(productToBeDeleted);

    res.json({
      success: true,
      wishlist,
      message: "product successfully removed from wishlist",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = wishlistRouter;
