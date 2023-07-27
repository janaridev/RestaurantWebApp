import { registryRoutes } from "./controllers/registryRoutes";
import Fastify, { FastifyInstance } from "fastify";

function buildServer() {
  const server: FastifyInstance = Fastify();

  registryRoutes(server);

  return server;
}

export default buildServer;
