import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  images: [
    {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
  ],
  price: {
    type: String,
  },
  reveiws: [reviewSchema],
  category: {
    type: String,
  },
  stock: {
    type: Number,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
