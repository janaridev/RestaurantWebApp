import { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "./responses/error";
import { getAllProducts } from "./product.service";
import { sendSuccessResponse } from "./responses/success";

export async function getAllProductsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const products = await getAllProducts();
    return sendSuccessResponse(reply, 200, products);
  } catch (e) {
    console.log(e);
    return handleError(reply, 500, e);
  }
}
