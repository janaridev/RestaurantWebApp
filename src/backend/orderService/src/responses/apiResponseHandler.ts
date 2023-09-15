import { OkResponse } from "./success";
import { ErrorResponse } from "./error";
import { Response } from "express";

export class ApiResponseHandler {
  static sendSuccessResponse<T>(
    res: Response,
    statusCode: number,
    result: T
  ): void {
    const response: OkResponse<T> = {
      isSuccess: true,
      statusCode,
      result,
    };
    res.status(statusCode).send(response);
  }

  static sendErrorResponse(
    res: Response,
    statusCode: number,
    error: string
  ): void {
    const response: ErrorResponse = {
      isSuccess: false,
      statusCode,
      error,
    };
    res.status(statusCode).send(response);
  }
}
