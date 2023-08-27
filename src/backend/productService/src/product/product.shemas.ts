import { Schema } from "mongoose";

export const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});
