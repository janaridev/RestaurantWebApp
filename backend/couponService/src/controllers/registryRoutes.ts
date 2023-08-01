import { FastifyInstance } from "fastify";
import { CouponController } from "./coupon.controller";
import { CouponService } from "../services/coupon.service";

export async function registryRoutes(server: FastifyInstance): Promise<void> {
  const couponService = new CouponService();
  const couponController = new CouponController(couponService);

  server.get("/coupons", couponController.getCoupons);
  server.get("/coupons/:couponId", couponController.getCouponById);
  server.post("/coupons", couponController.createCoupon);
  server.put("/coupons/:couponId", couponController.updateCoupon);
  server.delete("/coupons/:couponId", couponController.deleteCoupon);

  return;
}
