import { FastifyRequest, FastifyReply } from "fastify";
import { CouponService } from "../services/coupon.service";
import { ICreateCouponDto } from "../dtos/createCoupon.dto";
import { ApiResponseHandler } from "../models/responses/apiResponseHandler";
import { IUpdateCouponDto } from "../dtos/updateCoupon.dto";

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
  private readonly couponService: CouponService;
  constructor(couponService: CouponService) {
    this.couponService = couponService;
  }

  public async getCoupons(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const coupons = await this.couponService.getCoupons();
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

      const coupon = await this.couponService.getCouponById(couponId);
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

      const isCouponExist = await this.couponService.isCouponExist(
        coupon.couponCode
      );
      if (isCouponExist) {
        handleError(reply, 400, "Coupon already exists.");
        return;
      }

      const createdCoupon = await this.couponService.createCoupon(coupon);
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

      const isCouponIdExist = await this.couponService.getCouponById(couponId);
      if (isCouponIdExist === null) {
        handleError(reply, 404, "Coupon was not found.");
        return;
      }

      const coupon: IUpdateCouponDto = request.body;
      if (!coupon.couponCode || !coupon.discountAmount) {
        handleError(reply, 400, "Provide more information.");
        return;
      }

      const isCouponCodeExist = await this.couponService.isCouponExist(
        coupon.couponCode
      );
      if (isCouponCodeExist) {
        handleError(reply, 400, "Coupon code already exists.");
        return;
      }

      await this.couponService.updateCoupon(couponId, coupon);
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

      const isCouponIdExist = await this.couponService.getCouponById(couponId);
      if (isCouponIdExist === null) {
        handleError(reply, 404, "Coupon was not found.");
        return;
      }

      await this.couponService.deleteCoupon(couponId);
      sendSuccessResponse(reply, 200, "Coupon was deleted.");
    } catch (error) {
      handleError(reply, 500, "Failed to delete coupon.");
    }
  }
}
