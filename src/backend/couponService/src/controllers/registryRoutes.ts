import { FastifyInstance } from "fastify";
import { CouponController } from "./coupon.controller";
import { CouponService } from "../services/coupon.service";

export async function registryRoutes(server: FastifyInstance): Promise<void> {
  const couponService = new CouponService();
  const couponController = new CouponController(couponService);

  // In your route registration:
  server.get(
    "/coupons",
    {
      preHandler: [server.auth],
    },
    couponController.getCoupons.bind(couponController)
  );

  server.get(
    "/coupons/:couponId",
    {
      preHandler: [server.auth],
    },
    couponController.getCouponById.bind(couponController)
  );

  server.post(
    "/coupons",
    {
      preHandler: [server.auth],
    },
    couponController.createCoupon.bind(couponController)
  );

  server.put(
    "/coupons/:couponId",
    {
      preHandler: [server.auth],
    },
    couponController.updateCoupon.bind(couponController)
  );

  server.delete(
    "/coupons/:couponId",
    {
      preHandler: [server.auth],
    },
    couponController.deleteCoupon.bind(couponController)
  );
}
