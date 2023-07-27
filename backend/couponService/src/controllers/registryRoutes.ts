import { FastifyInstance } from "fastify";
import { CouponController } from "./coupon.controller";

export function registryRoutes(server: FastifyInstance): void {
  const couponController = new CouponController();

  server.post("/api/coupons", couponController.createCoupon);
}
