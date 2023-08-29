import { FastifyInstance } from "fastify";
import {
  createProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getSingleProductHandler,
} from "./product.controller";
import { $ref } from "./product.shemas";
import { checkRole } from "../utils/checkRole";

export async function productRoutes(server: FastifyInstance) {
  server.get("", getAllProductsHandler);

  server.get("/:productId", getSingleProductHandler);

  server.post(
    "",
    {
      schema: {
        body: $ref("productSchema"),
      },
      preHandler: [server.auth],
      preValidation: (req, reply, done) => {
        const role = checkRole(req.headers.authorization);

        if (role === "Admin") {
          done();
        } else {
          return reply.status(403).send();
        }
      },
    },
    createProductHandler
  );

  server.delete(
    "/:productId",
    {
      preHandler: [server.auth],
      preValidation: (req, reply, done) => {
        const role = checkRole(req.headers.authorization);

        if (role === "Admin") {
          done();
        } else {
          return reply.status(403).send();
        }
      },
    },
    deleteProductHandler
  );
}
