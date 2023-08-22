import { FastifyInstance } from "fastify";
import { loginHandler, registerUserHandler } from "./auth.controller";
import { fastifyAuthSchema } from "./auth.schemas";

async function authRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: fastifyAuthSchema.body,
      },
      preValidation: (req, reply, done) => {
        if (typeof req.body.password !== "string") {
          return reply.code(400).send({
            error: "Validation error",
            message: "Password must be a string",
          });
        }
        done();
      },
    },
    registerUserHandler
  );

  server.post(
    "/login",
    {
      schema: {
        body: fastifyAuthSchema.body,
      },
      preValidation: (req, reply, done) => {
        if (typeof req.body.password !== "string") {
          return reply.code(400).send({
            error: "Validation error",
            message: "Password must be a string",
          });
        }
        done();
      },
    },
    loginHandler
  );
}

export default authRoutes;
