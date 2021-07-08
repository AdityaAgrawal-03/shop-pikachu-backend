const mongoose = require("mongoose");
require('mongoose-type-url');
const { Schema } = mongoose;

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

module.exports =  { Product }

