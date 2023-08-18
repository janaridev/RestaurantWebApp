import { Schema } from "mongoose";

export const CouponSchema = new Schema({
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
