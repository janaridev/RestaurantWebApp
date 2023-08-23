import { FastifyReply } from "fastify";
import { ApiResponseHandler } from "./apiResponseHandler";

export interface OkResponse<T> {
  isSuccess: true;
  statusCode: number;
  result: T;
}

export const sendSuccessResponse = (
  reply: FastifyReply,
  statusCode: number,
  data: any
) => {
  ApiResponseHandler.sendSuccessResponse(reply, statusCode, data);
};
