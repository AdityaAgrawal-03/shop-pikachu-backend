const express = require("express");
const productRouter = express.Router();
const { Product } = require("../models/product.model");
const { extend } = require("lodash");

productRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const products = await Product.find({});
      res.json({ success: true, products });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "unable to retrieve the products" });
    }
  })

  .post(async (req, res) => {
    try {
      const product = req.body;
      const NewProduct = new Product(product);
      const savedProduct = await NewProduct.save();
      res.json({ success: true, product: savedProduct });
    } catch (error) {
      res
        .status(404)
        .json({
          success: false,
          message: "unable to add the product",
          errorMessage: error.message,
        });
    }
  });

productRouter.param("productId", async (req, res, next, id) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }

    req.product = product;

    next();
  } catch (error) {
    res.status(404).json({ success: false, message: "product not found" });
  }
});

productRouter
  .route("/:productId")
  .get((req, res) => {
    let product = req.product;
    product.__v = undefined;
    res.json({ success: true, product });
  })

  .post((req, res) => {
    const productUpdates = req.body;
    let product = req.product;

    product = extend(product, productUpdates);
    product.__v = undefined;
    product.save();

    res.json({
      success: true,
      product,
      message: "product updated successfully",
    });
  });

module.exports = productRouter;