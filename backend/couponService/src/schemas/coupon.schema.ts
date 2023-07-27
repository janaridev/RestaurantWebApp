import { Schema } from "mongoose";

export const CouponSchema = new Schema({
  couponId: {
    type: String,
    unique: true,
    required: true,
  },
  couponCode: {
    type: String,
    required: true,
  },
  discountAmount: {
    type: Number,
    required: true,
  },
  minAmount: Number,
});
