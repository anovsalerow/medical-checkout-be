import { Product } from "../models/product.js";

export const addAndSaveNewProduct = async (data) => {
    return await new Product(data).save();
};

export const getProductById = async (productId) => {
    return Product.findById(productId);
};

export const getProducts = async () => {
  return Product.find();
};