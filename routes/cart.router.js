const express = require("express");
const cartRouter = express.Router();
const { extend } = require("lodash");
const { Cart } = require("../models/cart.model");

cartRouter
  .route("/:userId")
  .get(async (req, res) => {
    try {
      const { userId } = req.params;
      const cart = await Cart.findById(userId).populate("products._id");

      const cartItem = cart.products.map((item) => {
        return { ...item._id._doc, quantity: item.quantity };
      });

      res.json({ success: true, cart: cartItem });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "unable to retrieve the cart" });
    }
  })

  .post(async (req, res) => {
    try {
      const { userId } = req.params;
      let { product } = req.body;
      const cart = await Cart.findById(userId);

      cart.products.push(product);
      const savedCart = await cart.save();
      res.json({
        success: true,
        cart: savedCart,
        message: "product added successfully to the cart",
      });
    } catch (error) {
      res
        .status(404)
        .json({ success: false, message: "unable to add product to the cart" });
    }
  });

cartRouter.route("/:userId/:productId").post(async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cart = await Cart.findById(userId);
    let productToBeUpdated = cart.products.find(
      (product) => product._id.toString() === productId
    );
    const productUpdates = req.body;

    if (productUpdates.quantity) {
      productToBeUpdated = extend(productToBeUpdated, productUpdates);
    } else {
      cart.products.pop(productToBeUpdated);
      productToBeUpdated = extend(productToBeUpdated, productUpdates);
    }

    await cart.save();
    res.json({
      success: true,
      cart,
      product: productToBeUpdated,
      message: "product updated in cart",
    });
  } catch (error) {
    res.status(404).json({ success: false, errorMessage: error.message });
  }
});

module.exports = cartRouter;
