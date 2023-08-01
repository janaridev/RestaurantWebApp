import { registryRoutes } from "./controllers/registryRoutes";
import Fastify, { FastifyInstance } from "fastify";

function buildServer() {
  const server: FastifyInstance = Fastify();

  server.register(registryRoutes, { prefix: "/api" });

  return server;
}

export default buildServer;
