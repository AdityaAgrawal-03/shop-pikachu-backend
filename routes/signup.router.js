const express = require("express");
const signupRouter = express.Router();
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
      const { firstName, lastName, email, password } = req.body;
      console.log(firstName, lastName, email, password);

      const NewUser = new User({ firstName, lastName, email, password });

      const user = await NewUser.save();

      const NewCart = new Cart({
        _id: user._id,
      });

      const NewWishlist = new Wishlist({
        _id: user._id,
      });

      await NewCart.save();
      await NewWishlist.save();

      res.json({ success: true, user, message: "user added succesfully" });
    } catch (error) {
      res.status(500).json({ success: false, errorMessage: error.message });
    }
  });

module.exports = signupRouter;
