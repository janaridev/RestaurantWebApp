import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import cors from "@fastify/cors";
import { productSchemas } from "./product/product.shemas";
import { productRoutes } from "./product/product.routes";
import jwt, { JWT } from "@fastify/jwt";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    auth: any;
  }
}

function buildServer() {
  const server: FastifyInstance = Fastify();
  server.register(cors, {
    origin: ["http://127.0.0.1", "http://localhost", "http://localhost:3000"],
  });

  server.register(jwt, {
    secret: process.env.SECRET_KEY,
  });

  server.decorate(
    "auth",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (e) {
        return reply.send(e);
      }
    }
  );

  server.addHook("preHandler", (req, reply, next) => {
    req.jwt = server.jwt;
    return next();
  });

  for (const schema of [...productSchemas]) {
    server.addSchema(schema);
  }

  server.register(productRoutes, { prefix: "/api/products" });

  return server;
}

export default buildServer;
