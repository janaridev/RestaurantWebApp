import { FastifyInstance } from "fastify";
import { CouponController } from "./coupon.controller";
import { CouponService } from "../services/coupon.service";

export async function registryRoutes(server: FastifyInstance): Promise<void> {
  const couponService = new CouponService();
  const couponController = new CouponController(couponService);

  // In your route registration:
  server.get("/coupons", couponController.getCoupons.bind(couponController));
  server.get(
    "/coupons/:couponId",
    couponController.getCouponById.bind(couponController)
  );
  server.post("/coupons", couponController.createCoupon.bind(couponController));
  server.put(
    "/coupons/:couponId",
    couponController.updateCoupon.bind(couponController)
  );
  server.delete(
    "/coupons/:couponId",
    couponController.deleteCoupon.bind(couponController)
  );
}
