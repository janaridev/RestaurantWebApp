import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { productSchemas } from "./product/product.shemas";
import { productRoutes } from "./product/product.routes";

function buildServer() {
  const server: FastifyInstance = Fastify();
  server.register(cors, {
    origin: ["http://127.0.0.1", "http://localhost", "http://localhost:3000"],
  });

  for (const schema of [...productSchemas]) {
    server.addSchema(schema);
  }

  server.register(productRoutes, { prefix: "/api/products" });

  return server;
}

export default buildServer;
