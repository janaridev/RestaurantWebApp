import { FastifyInstance } from "fastify";
import {
  createProductHandler,
  getAllProductsHandler,
  getSingleProductHandler,
} from "./product.controller";
import { $ref } from "./product.shemas";

export async function productRoutes(server: FastifyInstance) {
  server.get("", getAllProductsHandler);

  server.get("/:productId", getSingleProductHandler);

  server.post(
    "",
    {
      schema: {
        body: $ref("productSchema"),
      },
    },
    createProductHandler
  );
}
