const express = require("express");
const loginRouter = express.Router();
const { User } = require("../models/user.model");

loginRouter
  .route("/")

  .post(async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      console.log("from login", user);

      if (user) {
        return res.json({
          success: true,
          user,
          message: "user logged in succesfully",
        });
      }
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    } catch (error) {
      res.status(500).json({ success: false, errorMessage: error.message });
    }
  });

module.exports = loginRouter;
