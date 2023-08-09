import { registryRoutes } from "./controllers/registryRoutes";
import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";

function buildServer() {
  const server: FastifyInstance = Fastify();

  server.register(cors, {
    origin: "http://localhost:5173",
  });
  server.register(registryRoutes, { prefix: "/api" });

  return server;
}

export default buildServer;
