import { FastifyRequest, FastifyReply } from "fastify";
import { CouponService } from "../services/coupon.service";
import { ICreateCouponDto } from "../dtos/createCoupon.dto";
import { ApiResponseHandler } from "../models/responses/apiResponseHandler";
import { IUpdateCouponDto } from "../dtos/updateCoupon.dto";

const couponService = new CouponService();

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

export class CouponController {
  public async getCoupons(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const coupons = await couponService.getCoupons();
      sendSuccessResponse(reply, 200, coupons);
    } catch (error) {
      handleError(reply, 500, "Error while fetching coupons");
    }
  }

  public async getCouponById(
    request: FastifyRequest<{ Params: { couponId: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { couponId } = request.params;
      if (!couponId) {
        handleError(reply, 400, "Coupon id is null.");
        return;
      }

      const coupon = await couponService.getCouponById(couponId);
      if (coupon === null) {
        handleError(reply, 404, "Coupon was not found.");
        return;
      }

      sendSuccessResponse(reply, 200, coupon);
    } catch (error) {
      handleError(reply, 500, "Error while fetching coupon");
    }
  }

  public async createCoupon(
    request: FastifyRequest<{ Body: ICreateCouponDto }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const coupon: ICreateCouponDto = request.body;
      if (!coupon.couponCode || !coupon.discountAmount) {
        handleError(reply, 400, "Provide more information.");
        return;
      }

      const isCouponExist = await couponService.isCouponExist(
        coupon.couponCode
      );
      if (isCouponExist) {
        handleError(reply, 400, "Coupon already exists.");
        return;
      }

      const createdCoupon = await couponService.createCoupon(coupon);
      sendSuccessResponse(reply, 201, createdCoupon);
    } catch (error) {
      handleError(reply, 500, "Failed to create coupon.");
    }
  }

  public async updateCoupon(
    request: FastifyRequest<{
      Body: IUpdateCouponDto;
      Params: { couponId: string };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { couponId } = request.params;
      if (!couponId) {
        handleError(reply, 400, "Coupon id is null.");
        return;
      }

      const isCouponIdExist = await couponService.getCouponById(couponId);
      if (isCouponIdExist === null) {
        handleError(reply, 404, "Coupon was not found.");
        return;
      }

      const coupon: IUpdateCouponDto = request.body;
      if (!coupon.couponCode || !coupon.discountAmount) {
        handleError(reply, 400, "Provide more information.");
        return;
      }

      const isCouponCodeExist = await couponService.isCouponExist(
        coupon.couponCode
      );
      if (isCouponCodeExist) {
        handleError(reply, 400, "Coupon code already exists.");
        return;
      }

      await couponService.updateCoupon(couponId, coupon);
      sendSuccessResponse(reply, 200, "Coupon was updated.");
    } catch (error) {
      handleError(reply, 500, "Failed to update coupon.");
    }
  }

  public async deleteCoupon(
    request: FastifyRequest<{ Params: { couponId: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { couponId } = request.params;
      if (!couponId) {
        handleError(reply, 400, "Coupon id is null.");
        return;
      }

      const isCouponIdExist = await couponService.getCouponById(couponId);
      if (isCouponIdExist === null) {
        handleError(reply, 404, "Coupon was not found.");
        return;
      }

      await couponService.deleteCoupon(couponId);
      sendSuccessResponse(reply, 200, "Coupon was deleted.");
    } catch (error) {
      handleError(reply, 500, "Failed to delete coupon.");
    }
  }
}
