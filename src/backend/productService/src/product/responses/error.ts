import { FastifyReply } from "fastify";
import { ApiResponseHandler } from "./apiResponseHandler";

export interface ErrorResponse {
  isSuccess: false;
  statusCode: number;
  error: string;
}

export const handleError = (
  reply: FastifyReply,
  statusCode: number,
  errorMessage: string
) => {
  console.log(`--> Error: ${errorMessage}`);
  ApiResponseHandler.sendErrorResponse(reply, statusCode, errorMessage);
};
