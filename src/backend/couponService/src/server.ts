import { registryRoutes } from "./controllers/registryRoutes";
import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";

function buildServer() {
  const server: FastifyInstance = Fastify();
  server.register(cors, {
    origin: ["http://127.0.0.1", "http://localhost", "http://localhost:3000"],
  });
  server.register(registryRoutes, { prefix: "/api" });

  return server;
}

export default buildServer;
