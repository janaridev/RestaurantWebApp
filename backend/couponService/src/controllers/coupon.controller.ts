import { FastifyRequest, FastifyReply } from "fastify";
import { CouponService } from "../services/coupon.service";
import { ICreateCouponDto } from "../dtos/createCoupon.dto";
import { ApiResponseHandler } from "../models/responses/apiResponseHandler";
import { IUpdateCouponDto } from "../dtos/updateCoupon.dto";

const couponService = new CouponService();

export class CouponController {
  public async getCoupons(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const coupons = await couponService.getCoupons();

      ApiResponseHandler.sendSuccessResponse(reply, 200, coupons);
    } catch (error) {
      console.log(`--> Error while fetching coupons: ${error}`);

      ApiResponseHandler.sendErrorResponse(
        reply,
        500,
        "Error while fetching coupons"
      );
    }
  }

  public async getCouponById(
    request: FastifyRequest<{ Params: { couponId: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { couponId } = request.params;
      if (!couponId) {
        ApiResponseHandler.sendErrorResponse(reply, 400, "Coupon id is null.");
      }

      const coupon = await couponService.getCouponById(couponId);
      if (coupon === null) {
        ApiResponseHandler.sendErrorResponse(
          reply,
          404,
          "Coupon was not found."
        );
      }

      ApiResponseHandler.sendSuccessResponse(reply, 200, coupon);
    } catch (error) {
      console.log(`--> Error while fetching coupon: ${error}`);
      ApiResponseHandler.sendErrorResponse(
        reply,
        500,
        "Error while fetching coupon"
      );
    }
  }

  public async createCoupon(
    request: FastifyRequest<{ Body: ICreateCouponDto }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const coupon: ICreateCouponDto = request.body;
      if (!coupon.couponCode || !coupon.discountAmount) {
        ApiResponseHandler.sendErrorResponse(
          reply,
          400,
          "Provide more information."
        );
      }

      const isCouponExist = await couponService.isCouponExist(
        coupon.couponCode
      );
      if (isCouponExist) {
        ApiResponseHandler.sendErrorResponse(
          reply,
          400,
          "Coupon already exists."
        );
      }

      const createdCoupon = await couponService.createCoupon(coupon);

      ApiResponseHandler.sendSuccessResponse(reply, 201, createdCoupon);
    } catch (error) {
      console.log(`--> Error while creating coupon: ${error}`);
      ApiResponseHandler.sendErrorResponse(
        reply,
        500,
        "Failed to create coupon."
      );
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
        ApiResponseHandler.sendErrorResponse(reply, 400, "Coupon id is null.");
      }

      const isCouponIdExist = await couponService.getCouponById(couponId);
      if (isCouponIdExist === null) {
        ApiResponseHandler.sendErrorResponse(
          reply,
          404,
          "Coupon was not found."
        );
      }

      const coupon: IUpdateCouponDto = request.body;
      if (!coupon.couponCode || !coupon.discountAmount) {
        ApiResponseHandler.sendErrorResponse(
          reply,
          400,
          "Provide more information."
        );
      }

      const isCouponCodeExist = await couponService.isCouponExist(
        coupon.couponCode
      );
      if (isCouponCodeExist) {
        ApiResponseHandler.sendErrorResponse(
          reply,
          400,
          "Coupon code already exists."
        );
      }

      await couponService.updateCoupon(couponId, coupon);

      ApiResponseHandler.sendSuccessResponse(reply, 200, "Coupon was updated.");
    } catch (error) {
      console.log(`--> Error while updating coupon: ${error}`);

      ApiResponseHandler.sendErrorResponse(
        reply,
        500,
        "Failed to update coupon."
      );
    }
  }

  public async deleteCoupon(
    request: FastifyRequest<{
      Params: { couponId: string };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { couponId } = request.params;
      if (!couponId) {
        ApiResponseHandler.sendErrorResponse(reply, 400, "Coupon id is null.");
      }

      const isCouponIdExist = await couponService.getCouponById(couponId);
      if (isCouponIdExist === null) {
        ApiResponseHandler.sendErrorResponse(
          reply,
          404,
          "Coupon was not found."
        );
      }

      await couponService.deleteCoupon(couponId);

      ApiResponseHandler.sendSuccessResponse(reply, 200, "Coupon was deleted.");
    } catch (error) {
      console.log(`--> Error while deleting coupon: ${error}`);
      ApiResponseHandler.sendErrorResponse(
        reply,
        500,
        "Failed to delete coupon."
      );
    }
  }
}
