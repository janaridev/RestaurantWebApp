import { FastifyRequest } from "fastify";
import { CouponService } from "../services/coupon.service";
import { ICreateCouponDto } from "../dtos/createCoupon.dto";
import { ResponseDto } from "../dtos/response.dto";
import { IUpdateCouponDto } from "../dtos/updateCoupon.dto";

const couponService = new CouponService();
const response = new ResponseDto();

export class CouponController {
  public async getCoupons(): Promise<ResponseDto> {
    try {
      const coupons = await couponService.getCoupons();

      response.isSuccess = true;
      response.statusCode = 200;
      response.result = coupons;
    } catch (error) {
      console.log(`--> Error while fetching coupons: ${error}`);

      response.isSuccess = false;
      response.statusCode = 500;
      response.result = { error: "Error while fetching coupons" };
    }
    return response;
  }

  public async getCouponById(
    request: FastifyRequest<{ Params: { couponId: string } }>
  ): Promise<ResponseDto> {
    try {
      const { couponId } = request.params;
      if (!couponId) {
        response.isSuccess = false;
        response.statusCode = 400;
        response.result = { error: "Coupon id is null." };

        return response;
      }

      const coupon = await couponService.getCouponById(couponId);
      if (coupon === null) {
        response.isSuccess = false;
        response.statusCode = 404;
        response.result = { error: "Coupon was not found." };

        return response;
      }

      response.isSuccess = true;
      response.statusCode = 200;
      response.result = coupon;
    } catch (error) {
      console.log(`--> Error while fetching coupon: ${error}`);

      response.isSuccess = false;
      response.statusCode = 500;
      response.result = { error: "Error while fetching coupon" };
    }
    return response;
  }

  public async createCoupon(
    request: FastifyRequest<{ Body: ICreateCouponDto }>
  ): Promise<ResponseDto> {
    try {
      const coupon: ICreateCouponDto = request.body;
      if (!coupon.couponCode || !coupon.discountAmount) {
        response.isSuccess = false;
        response.statusCode = 400;
        response.result = { error: "Provide more information." };
        return response;
      }

      const isCouponExist = await couponService.isCouponExist(
        coupon.couponCode
      );
      if (isCouponExist) {
        response.isSuccess = false;
        response.statusCode = 400;
        response.result = { error: "Coupon already exists." };
        return response;
      }

      const createdCoupon = await couponService.createCoupon(coupon);

      response.isSuccess = true;
      response.statusCode = 201;
      response.result = createdCoupon;
    } catch (error) {
      console.log(`--> Error while creating coupon: ${error}`);

      response.isSuccess = false;
      response.statusCode = 500;
      response.result = { error: "Failed to create coupon." };
    }
    return response;
  }

  public async updateCoupon(
    request: FastifyRequest<{
      Body: IUpdateCouponDto;
      Params: { couponId: string };
    }>
  ): Promise<ResponseDto> {
    try {
      const { couponId } = request.params;
      if (!couponId) {
        response.isSuccess = false;
        response.statusCode = 400;
        response.result = { error: "Coupon id is null." };

        return response;
      }

      const isCouponIdExist = await couponService.getCouponById(couponId);
      if (isCouponIdExist === null) {
        response.isSuccess = false;
        response.statusCode = 404;
        response.result = { error: "Coupon was not found." };

        return response;
      }

      const coupon: IUpdateCouponDto = request.body;
      if (!coupon.couponCode || !coupon.discountAmount) {
        response.isSuccess = false;
        response.statusCode = 400;
        response.result = { error: "Provide more information." };

        return response;
      }

      const isCouponCodeExist = await couponService.isCouponExist(
        coupon.couponCode
      );
      if (isCouponCodeExist) {
        response.isSuccess = false;
        response.statusCode = 400;
        response.result = { error: "Coupon code already exists." };

        return response;
      }

      await couponService.updateCoupon(couponId, coupon);

      response.isSuccess = true;
      response.statusCode = 200;
      response.result = { message: "Coupon was updated." };
    } catch (error) {
      console.log(`--> Error while updating coupon: ${error}`);

      response.isSuccess = false;
      response.statusCode = 500;
      response.result = { error: "Failed to update coupon." };
    }
    return response;
  }

  public async deleteCoupon(
    request: FastifyRequest<{
      Params: { couponId: string };
    }>
  ): Promise<ResponseDto> {
    try {
      const { couponId } = request.params;
      if (!couponId) {
        response.isSuccess = false;
        response.statusCode = 400;
        response.result = { error: "Coupon id is null." };

        return response;
      }

      const isCouponIdExist = await couponService.getCouponById(couponId);
      if (isCouponIdExist === null) {
        response.isSuccess = false;
        response.statusCode = 404;
        response.result = { error: "Coupon was not found." };

        return response;
      }

      await couponService.deleteCoupon(couponId);

      response.isSuccess = true;
      response.statusCode = 200;
      response.result = { message: "Coupon was deleted." };
    } catch (error) {
      console.log(`--> Error while deleting coupon: ${error}`);

      response.isSuccess = false;
      response.statusCode = 500;
      response.result = { error: "Failed to delete coupon." };
    }
    return response;
  }
}
