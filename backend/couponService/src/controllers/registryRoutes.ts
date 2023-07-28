import { FastifyInstance } from "fastify";
import { CouponController } from "./coupon.controller";

export function registryRoutes(server: FastifyInstance): void {
  const couponController = new CouponController();

  server.get("/api/coupons", couponController.getCoupons);
  server.post("/api/coupons", couponController.createCoupon);
}
