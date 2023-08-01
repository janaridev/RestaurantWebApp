import { Document, model } from "mongoose";
import { CouponSchema } from "../schemas/coupon.schema";

export interface ICoupon {
  couponCode: string;
  discountAmount: number;
  minAmount: number;
}

export const Coupon = model<ICoupon>("Coupon", CouponSchema);
