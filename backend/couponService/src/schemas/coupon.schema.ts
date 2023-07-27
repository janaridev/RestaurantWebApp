import { Schema } from "mongoose";

export const CouponSchema = new Schema({
  couponId: {
    type: String,
    unique: true,
    required: true,
  },
  couponCode: String,
  discountAmount: Number,
  minAmount: Number,
});
