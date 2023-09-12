import * as yup from "yup";

export interface ProductCountInput {
  count: number;
}

export const productCountSchema = yup.object().shape({
  count: yup
    .number()
    .min(1, "Min count of product: 1")
    .required("Required field."),
});

export const countInitialValue: ProductCountInput = {
  count: 1,
};
