import { FastifyReply, FastifyRequest } from "fastify";
import { IAuthDto } from "./dtos/createUser.dto";
import { registerUser, findUserByEmail, getParsedId } from "./auth.service";
import { verifyPassword } from "../utils/hash";
import { handleError } from "./responses/error";
import { sendSuccessResponse } from "./responses/success";

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: IAuthDto;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    if (await findUserByEmail(body.email)) {
      return handleError(reply, 400, "User with this email already exists.");
    }

    await registerUser(body);

    return sendSuccessResponse(reply, 201, { message: "User Created !" });
  } catch (e) {
    console.log(e);
    handleError(reply, 500, e);
  }
}

export async function loginHandler(
  request: FastifyRequest<{
    Body: IAuthDto;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    // find a user by email
    const user = await findUserByEmail(body.email);
    if (!user) {
      return handleError(reply, 401, "Invalid email or password");
    }

    const parsedId = getParsedId(user._id);

    // verify password
    const correctPassword = verifyPassword({
      candidatePassword: body.password,
      salt: user.salt,
      hash: user.password,
    });

    if (correctPassword) {
      // generate access token
      const payload = {
        id: parsedId,
        email: user.email,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 900, // token will expired after 15 min
      };
      return sendSuccessResponse(reply, 200, request.jwt.sign(payload));
    }

    return handleError(reply, 401, "Invalid email or password");
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}
