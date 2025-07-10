import Product from "../models/product.model.js";
import { logger } from "../utils/logger.js";

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    logger.info("Product created", { product });
    res.status(201).json(product);
  } catch (err) {
    logger.error("Create product failed", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getAllProducts = async (_req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    logger.error("Fetch products failed", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    logger.error("Get product failed", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    logger.info("Product updated", { id: product._id });
    res.json(product);
  } catch (err) {
    logger.error("Update product failed", err);
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    logger.info("Product deleted", { id: product._id });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    logger.error("Delete product failed", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
};
