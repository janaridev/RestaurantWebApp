import { FastifyReply } from "fastify";
import { OkResponse } from "./success";
import { ErrorResponse } from "./error";

export class ApiResponseHandler {
  static sendSuccessResponse<T>(
    reply: FastifyReply,
    statusCode: number,
    result: T
  ): void {
    const response: OkResponse<T> = {
      isSuccess: true,
      statusCode,
      result,
    };
    reply.status(statusCode).send(response);
  }

  static sendErrorResponse(
    reply: FastifyReply,
    statusCode: number,
    error: string
  ): void {
    const response: ErrorResponse = {
      isSuccess: false,
      statusCode,
      error,
    };
    reply.status(statusCode).send(response);
  }
}
