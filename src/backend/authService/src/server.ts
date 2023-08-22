import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import authRoutes from "./auth/auth.routes";

function buildServer() {
  const server: FastifyInstance = Fastify();
  server.register(cors, {
    origin: ["http://127.0.0.1", "http://localhost"],
  });

  server.register(authRoutes, { prefix: "api/auth" });

  return server;
}

export default buildServer;
