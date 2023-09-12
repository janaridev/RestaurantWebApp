import * as yup from "yup";

export interface CouponCodeInput {
  couponCode: string;
}

export const couponCodeSchema = yup.object().shape({
  couponCode: yup
    .string()
    .min(3, "Min length of coupon code: 3")
    .required("Required field."),
});

export const couponInitialValue: CouponCodeInput = {
  couponCode: "", // Changed initial count to 1
};