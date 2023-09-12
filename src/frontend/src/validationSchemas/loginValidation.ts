import * as yup from "yup";

export interface LoginFormValues {
  email: string;
  password: string;
}

export const loginSchema = yup.object().shape({
  email: yup.string().required("Email is a required field.").email(),
  password: yup
    .string()
    .min(5, "Password must be at least 8 characters long.")
    .required("Password is a required field."),
});

export const initialValuesCoupon: LoginFormValues = {
  email: "",
  password: "",
};
