import Fastify, { FastifyInstance } from "fastify";

function buildServer() {
  const server: FastifyInstance = Fastify();
  return server;
}

export default buildServer;
