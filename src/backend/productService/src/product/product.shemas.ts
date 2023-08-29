import { Schema } from "mongoose";
import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

// MONGOOSE SCHEMA
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

// ZOD SCHEMAS
const productSchema = z.object({
  name: z.string({
    required_error: "Product name is required.",
    invalid_type_error: "Product name must be a string.",
  }),
  price: z.number({
    required_error: "Product price is required.",
    invalid_type_error: "Product price must be a number.",
  }),
  description: z.string({
    required_error: "Product description is required.",
    invalid_type_error: "Product description must be a string.",
  }),
  categoryName: z.string({
    required_error: "Product category name is required.",
    invalid_type_error: "Product category name must be a string",
  }),
  imageUrl: z.string({
    required_error: "Product image url is required.",
    invalid_type_error: "Product image url must be a string",
  }),
});

export type ProductInput = z.infer<typeof productSchema>;

export const { schemas: productSchemas, $ref } = buildJsonSchemas({
  productSchema,
});
