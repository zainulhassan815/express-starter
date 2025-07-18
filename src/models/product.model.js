import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    description: { type: String },
  },
  { timestamps: true },
);

export const ProductModel = mongoose.model("Product", productSchema);
