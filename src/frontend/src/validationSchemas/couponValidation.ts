import * as yup from "yup";
import CouponFormValues from "../interfaces/Coupon";

export const couponSchema = yup.object().shape({
  couponCode: yup.string().required("Required field."),
  discountAmount: yup
    .number()
    .min(1, "Discount Amount must be greater than 0")
    .required("Required field."),
  minAmount: yup.number().min(1, "Minimum Amount must be greater than 0"),
});

export const couponInitialValues: CouponFormValues = {
  couponCode: "",
  discountAmount: 0,
  minAmount: 0,
};
