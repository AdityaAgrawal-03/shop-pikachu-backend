const express = require("express");
const userRouter = express.Router();
const { User } = require("../models/user.model");

userRouter.route("/").get(async (req, res) => {
  try {
    const { email } = req.headers;
    console.log(email);
    const users = await User.findOne({ email });
    res.json({ success: true, users });
  } catch (error) {
    res.status(404).json({ success: false, message: "user not found" });
  }
});

module.exports = userRouter;
