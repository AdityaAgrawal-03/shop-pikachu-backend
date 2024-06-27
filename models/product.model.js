const mongoose = require("mongoose");
require('mongoose-type-url');
const { Schema } = mongoose;
const products = require("../products-data/products-data")

const ProductSchema = new Schema({
  name: {
    type: String,
    required: "Cannot add product without name",
    unique: true
  },
  image: {
    type: String,
    required: "Cannot add product without valid cover image",
    unique: true
  },
  description: {
    type: String,
    required: "Cannot add product without description",
    minLength: [100, "The description must be atleast 100 characters long"]
  },
  details: [
    {
      title: {
        type: String,
        required: true
      },
      text: {
        type: String,
      }
    }
  ],
  typeOfBike: {
    type: Schema.Types.Mixed,
    required: "Cannot add product without the type of bike"
  },
  price: {
    type: Number,
    required: "Cannot add product without price"
  },
  fastDelivery: {
    type: Boolean,
    required: "Cannot add product without mentioning fast delivery criteria"
  },
  inStock: {
    type: Boolean,
    required: "Cannot add product without mentioning whether product is in stock or not"
  },
}, {
  timestamps: true
})

const Product = mongoose.model("Product", ProductSchema);

async function seedAllProducts() {
  try {
    products.forEach(async (product) => {
      const addedProduct = new Product(product);
      await addedProduct.save();
    });
    console.log("products added successfully")
  } catch (error) {
    console.error(error)
  }
}

module.exports =  { Product, seedAllProducts }

