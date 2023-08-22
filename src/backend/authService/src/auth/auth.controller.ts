import { FastifyReply, FastifyRequest } from "fastify";
import { IAuthDto } from "./dtos/createUser.dto";
import { registerUser, findUserByEmail, getParsedId } from "./auth.service";
import { ApiResponseHandler } from "./responses/apiResponseHandler";
import { verifyPassword } from "../utils/hash";

const handleError = (
  reply: FastifyReply,
  statusCode: number,
  errorMessage: string
) => {
  console.log(`--> Error: ${errorMessage}`);
  ApiResponseHandler.sendErrorResponse(reply, statusCode, errorMessage);
};

const sendSuccessResponse = (
  reply: FastifyReply,
  statusCode: number,
  data: any
) => {
  ApiResponseHandler.sendSuccessResponse(reply, statusCode, data);
};

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
    const parsedId = getParsedId(user._id);

    if (!user) {
      return handleError(reply, 401, "Invalid email or password");
    }

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
