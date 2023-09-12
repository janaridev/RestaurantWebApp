import * as yup from "yup";
import ProductFormValues from "../interfaces/Product";

export const productSchema = yup.object().shape({
  name: yup.string().required("Required field."),
  price: yup
    .number()
    .min(1, "Discount Amount must be greater than 0")
    .required("Required field."),
  description: yup.string().required("Required field."),
  categoryName: yup.string().required("Required field."),
  imageUrl: yup.string().required("Required field."),
});

export const productInitialValues: ProductFormValues = {
  name: "",
  price: 0,
  description: "",
  categoryName: "",
  imageUrl: "",
};
