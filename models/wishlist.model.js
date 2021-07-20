const mongoose = require("mongoose");
const { Schema } = mongoose;

const WishlistSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    products: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = { Wishlist };
