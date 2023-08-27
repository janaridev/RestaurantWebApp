import { FastifyInstance } from "fastify";
import { getAllProductsHandler } from "./product.controller";

export async function productRoutes(server: FastifyInstance) {
  server.get("/", getAllProductsHandler);
}
