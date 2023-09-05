import { FastifyInstance } from "fastify";
import { CouponController } from "./coupon.controller";
import { CouponService } from "../services/coupon.service";
import { checkRole } from "../utils/checkRole";

export async function registryRoutes(server: FastifyInstance): Promise<void> {
  const couponService = new CouponService();
  const couponController = new CouponController(couponService);

  server.get("/coupons", couponController.getCoupons.bind(couponController));

  server.get(
    "/coupons/:couponCode",
    couponController.getCouponByCode.bind(couponController)
  );

  server.post(
    "/coupons",
    {
      preHandler: [server.auth],
      preValidation: (req, reply, done) => {
        const role = checkRole(req.headers.authorization);

        if (role === "Admin") {
          done();
        } else {
          return reply.status(403).send();
        }
      },
    },
    couponController.createCoupon.bind(couponController)
  );

  server.put(
    "/coupons/:couponId",
    {
      preHandler: [server.auth],
      preValidation: (req, reply, done) => {
        const role = checkRole(req.headers.authorization);

        if (role === "Admin") {
          done();
        } else {
          return reply.status(403).send();
        }
      },
    },
    couponController.updateCoupon.bind(couponController)
  );

  server.delete(
    "/coupons/:couponId",
    {
      preHandler: [server.auth],
      preValidation: (req, reply, done) => {
        const role = checkRole(req.headers.authorization);

        if (role === "Admin") {
          done();
        } else {
          return reply.status(403).send();
        }
      },
    },
    couponController.deleteCoupon.bind(couponController)
  );
}
