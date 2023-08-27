import { Product } from "./product.model";

export async function getAllProducts() {
  return await Product.find();
}

export async function getSingleProduct(productId: string) {
  return await Product.findById(productId);
}
