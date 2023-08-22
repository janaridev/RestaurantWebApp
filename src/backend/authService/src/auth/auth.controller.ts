import { FastifyReply, FastifyRequest } from "fastify";
import { ICreateUserDto } from "./dtos/createUser.dto";
import { registerUser, findUserByEmail } from "./auth.service";
import { ApiResponseHandler } from "./responses/apiResponseHandler";

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
    Body: ICreateUserDto;
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
