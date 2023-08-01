import { FastifyInstance } from "fastify";
import { CouponController } from "./coupon.controller";
import { CouponService } from "../services/coupon.service";

export function registryRoutes(server: FastifyInstance): void {
  const couponService = new CouponService();
  const couponController = new CouponController(couponService);

  server.get("/api/coupons", couponController.getCoupons);
  server.get("/api/coupons/:couponId", couponController.getCouponById);
  server.post("/api/coupons", couponController.createCoupon);
  server.put("/api/coupons/:couponId", couponController.updateCoupon);
  server.delete("/api/coupons/:couponId", couponController.deleteCoupon);
}
