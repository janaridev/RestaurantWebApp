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
      return sendSuccessResponse(reply, 200, coupons);
    } catch (error) {
      return handleError(reply, 500, "Error while fetching coupons");
    }
  }

  public async getCouponById(
    request: FastifyRequest<{ Params: { couponId: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { couponId } = request.params;
      if (!couponId) {
        return handleError(reply, 400, "Coupon id is null.");
      }

      const coupon = await this.couponService.getCouponById(couponId);
      if (coupon === null) {
        return handleError(reply, 404, "Coupon was not found.");
      }

      return sendSuccessResponse(reply, 200, coupon);
    } catch (error) {
      return handleError(reply, 500, "Error while fetching coupon");
    }
  }

  public async getCouponByCode(
    request: FastifyRequest<{ Params: { couponCode: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { couponCode } = request.params;
      if (!couponCode) {
        return handleError(reply, 400, "Coupon id is null.");
      }

      const coupon = await this.couponService.getCouponByCode(couponCode);
      if (coupon === null) {
        return handleError(reply, 404, "Coupon was not found.");
      }

      return sendSuccessResponse(reply, 200, coupon);
    } catch (error) {
      return handleError(reply, 500, "Error while fetching coupon");
    }
  }

  public async createCoupon(
    request: FastifyRequest<{ Body: ICreateCouponDto }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const coupon: ICreateCouponDto = request.body;
      if (!coupon.couponCode || !coupon.discountAmount) {
        return handleError(reply, 400, "Provide more information.");
      }

      const isCouponExist = await this.couponService.isCouponExist(
        coupon.couponCode
      );
      if (isCouponExist) {
        return handleError(reply, 400, "Coupon already exists.");
      }

      const createdCoupon = await this.couponService.createCoupon(coupon);
      return sendSuccessResponse(reply, 201, createdCoupon);
    } catch (error) {
      return handleError(reply, 500, "Failed to create coupon.");
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
        return handleError(reply, 400, "Coupon id is null.");
      }

      const isCouponIdExist = await this.couponService.getCouponById(couponId);
      if (isCouponIdExist === null) {
        return handleError(reply, 404, "Coupon was not found.");
      }

      const coupon: IUpdateCouponDto = request.body;
      if (!coupon.couponCode || !coupon.discountAmount) {
        return handleError(reply, 400, "Provide more information.");
      }

      const isCouponCodeExist = await this.couponService.isCouponExist(
        coupon.couponCode
      );
      if (isCouponCodeExist) {
        return handleError(reply, 400, "Coupon code already exists.");
      }

      await this.couponService.updateCoupon(couponId, coupon);
      return sendSuccessResponse(reply, 200, "Coupon was updated.");
    } catch (error) {
      return handleError(reply, 500, "Failed to update coupon.");
    }
  }

  public async deleteCoupon(
    request: FastifyRequest<{ Params: { couponId: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { couponId } = request.params;
      if (!couponId) {
        return handleError(reply, 400, "Coupon id is null.");
      }

      const isCouponIdExist = await this.couponService.getCouponById(couponId);
      if (isCouponIdExist === null) {
        return handleError(reply, 404, "Coupon was not found.");
      }

      await this.couponService.deleteCoupon(couponId);
      return sendSuccessResponse(reply, 200, "Coupon was deleted.");
    } catch (error) {
      return handleError(reply, 500, "Failed to delete coupon.");
    }
  }
}
