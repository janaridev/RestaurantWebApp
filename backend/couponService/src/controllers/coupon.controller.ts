import { FastifyRequest, FastifyReply } from "fastify";
import { CouponService } from "../services/coupon.service";
import { ICoupon } from "models/coupon.model";
import { CreateCouponDto } from "../dtos/createCoupon.dto";

const couponService = new CouponService();

export class CouponController {
  public async createCoupon(
    request: FastifyRequest<{ Body: CreateCouponDto }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const coupon: CreateCouponDto = request.body;
      if (!coupon.couponCode || !coupon.discountAmount) {
        reply.code(400).send({ error: "Provide more information." });
        return;
      }

      const isCouponExist = await couponService.isCouponExist(
        coupon.couponCode
      );
      if (isCouponExist) {
        reply.code(400).send({ error: "Coupon already exist." });
        return;
      }

      const createdCoupon = await couponService.createCoupon(coupon);

      reply.code(201).send({ createdCoupon });
    } catch (error) {
      console.log(`--> Error while creating coupon: ${error}`);
      reply.code(400).send({ error: "Failed to create coupon." });
    }
  }
}
