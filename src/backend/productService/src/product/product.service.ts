import { Product } from "./product.model";
import { ProductInput } from "./product.shemas";

export async function getAllProducts() {
  return await Product.find();
}

export async function getSingleProduct(productId: string) {
  return await Product.findById(productId);
}

export async function createProduct(input: ProductInput) {
  await Product.create(input);
}

export async function deleteProduct(productId: string) {
  await Product.findByIdAndDelete(productId);
}
