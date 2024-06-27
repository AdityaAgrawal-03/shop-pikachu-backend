const express = require("express");
const cartRouter = express.Router();
const { extend } = require("lodash");
const { Cart } = require("../models/cart.model");

cartRouter.route("/")
  .get(async (req, res) => {
    try {
      const { userId } = req.user;
      const cart = await Cart.findById(userId).populate("products._id");

      const cartItem = cart.products.map((item) => {
        return { ...item._id._doc, quantity: item.quantity }
      })

      res.json({ success: true, cart: cartItem })
    } catch (error) {
      res.status(500).json({ success: false, message: "unable to retrieve the cart" })
    }
  })

  .post(async (req, res) => {
    try {
      const { userId } = req.user;
      let { product } = req.body;
      const cart = await Cart.findById(userId);

      cart.products.push(product);
      const savedCart = await cart.save();
      res.json({ success: true, cart: savedCart, message: "product added successfully to the cart" })

    } catch (error) {
      res.status(404).json({ success: false, message: "unable to add product to the cart" })
    }
  })

  .delete(async (req, res) => {
    try {
      const { userId } = req.user;
      const cart = await Cart.findById(userId);

      cart.products = [];
      await cart.save();

      res.json({ success: true, message: "cart emptied!" })
    } catch (error) {
      res.json({ success :false, message: "unable to delete cart" })
    }
  })



cartRouter.route("/:productId")
  .post(async (req, res) => {
    try {
      const { userId } = req.user;
      const { productId } = req.params;
      const cart = await Cart.findById(userId);
      let productToBeUpdated = cart.products.find(product => product._id.toString() === productId);
      const productUpdates = req.body;

      if (productUpdates.quantity) {
        productToBeUpdated = extend(productToBeUpdated, productUpdates)
      } else {
        productToBeUpdated = extend(productToBeUpdated, productUpdates)
        cart.products.pull(productToBeUpdated._id);
       }
      
      await cart.save();
      res.json({ success: true, cart, product: productToBeUpdated, message: "product updated in cart" })


    } catch (error) {
      res.status(404).json({ success: false, errorMessage: error.message })
    }
  })

module.exports = cartRouter;