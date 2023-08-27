import { model } from "mongoose";
import { ProductSchema } from "./product.shemas";

export interface IProduct {
  name: string;
  price: number;
  description: string;
  categoryName: string;
  imageUrl: string;
}

export const Product = model<IProduct>("Product", ProductSchema);
