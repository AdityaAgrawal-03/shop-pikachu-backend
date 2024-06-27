const express = require("express");
const signupRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = process.env["secret"];
const { User } = require("../models/user.model");
const { Cart } = require("../models/cart.model");
const { Wishlist } = require("../models/wishlist.model");

signupRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const user = await User.find({});
      res.json({ success: true, user });
    } catch (error) {
      res.status(404).json({ success: false, message: "user not found" });
    }
  })

  .post(async (req, res) => {
    try {
      let { firstName, lastName, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      const user = new User({ firstName, lastName, email, password });
      await user.save();

      const token = jwt.sign({ userId: user._id }, secret, {
        expiresIn: "24h",
      });

      const NewCart = new Cart({
        _id: user._id,
      });

      const NewWishlist = new Wishlist({
        _id: user._id,
      });

      await NewCart.save();
      await NewWishlist.save();

      res.json({
        success: true,
        user,
        token,
        message: "user added succesfully",
      });
    } catch (error) {
      res.status(500).json({ success: false, errorMessage: error.message });
    }
  });

module.exports = signupRouter;
