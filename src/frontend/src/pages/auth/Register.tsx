import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

interface RegisterFormValues {
  email: string;
  password: string;
}

const registerSchema = yup.object().shape({
  email: yup.string().required("Email is a required field.").email(),
  password: yup
    .string()
    .min(5, "Password must be at least 8 characters long.")
    .required("Password is a required field."),
});

const initialValuesCoupon: RegisterFormValues = {
  email: "",
  password: "",
};

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      await axios.post("http://localhost/api/auth", values);

      toast.success("User created!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Navigate back to the main page
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Error creating coupon:", axiosError);
        const response: AxiosResponse<any> | undefined = axiosError.response;
        const errorMessage = response?.data?.error || "An error occurred";

        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        console.error("Unknown error:", error);
        toast.error("An error occurred");
      }
    }
  };

  return (
    <Formik
      initialValues={initialValuesCoupon}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <br />
        <div className="container border p-4">
          <div className="row text-center">
            <h1>Register</h1>
          </div>
          <hr />
          <div className="row">
            <div className="col-12 col-md-6 offset-md-3 pb-2">
              <Field
                type="text"
                name="email"
                className="form-control"
                placeholder="Email..."
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="col-12 col-md-6 offset-md-3 pb-2">
              <Field
                type="password"
                name="password"
                className="form-control"
                placeholder="Password..."
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="col-12 col-md-6 offset-md-3 pb-2">
              <button
                type="submit"
                className="form-control btn btn-success"
                value="Submit"
              >
                REGISTER
              </button>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default Register;
