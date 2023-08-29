import { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "./responses/error";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
} from "./product.service";
import { sendSuccessResponse } from "./responses/success";
import { ProductInput } from "./product.shemas";

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

export async function getSingleProductHandler(
  request: FastifyRequest<{ Params: { productId: string } }>,
  reply: FastifyReply
) {
  const { productId } = request.params;
  if (!productId) {
    return handleError(reply, 400, "Product id is null.");
  }

  try {
    const product = await getSingleProduct(productId);
    if (product === null) {
      return handleError(reply, 404, "Product id is not found.");
    }

    return sendSuccessResponse(reply, 200, product);
  } catch (e) {
    console.log(e);
    return handleError(reply, 500, e);
  }
}

export async function createProductHandler(
  request: FastifyRequest<{ Body: ProductInput }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    createProduct(body);
    return sendSuccessResponse(reply, 201, "Product created!");
  } catch (e) {
    console.log(e);
    return handleError(reply, 500, e);
  }
}

export async function deleteProductHandler(
  request: FastifyRequest<{ Params: { productId: string } }>,
  reply: FastifyReply
) {
  const { productId } = request.params;
  if (!productId) {
    return handleError(reply, 400, "Product id is null.");
  }

  try {
    const product = await getSingleProduct(productId);
    if (product === null) {
      return handleError(reply, 404, "Product id is not found.");
    }

    await deleteProduct(productId);

    return sendSuccessResponse(reply, 200, "Product deleted!");
  } catch (e) {
    console.log(e);
    return handleError(reply, 500, e);
  }
}
