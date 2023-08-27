import { Schema } from "mongoose";

// Mongoose Schema
export const AuthSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

// Fastify Schema
export const fastifyAuthSchema = {
  body: {
    type: "object",
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 5 },
    },
    required: ["email", "password"],
  },
};
