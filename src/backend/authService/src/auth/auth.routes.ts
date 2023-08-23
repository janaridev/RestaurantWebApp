import { FastifyInstance } from "fastify";
import { loginHandler, registerUserHandler } from "./auth.controller";
import { fastifyAuthSchema } from "./auth.schemas";
import { handleError } from "./responses/error";

async function authRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: fastifyAuthSchema.body,
      },
      preValidation: (req, reply, done) => {
        if (typeof req.body.password !== "string") {
          return handleError(reply, 400, "Password must be a string");
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
          return handleError(reply, 400, "Password must be a string");
        }
        done();
      },
    },
    loginHandler
  );
}

export default authRoutes;
