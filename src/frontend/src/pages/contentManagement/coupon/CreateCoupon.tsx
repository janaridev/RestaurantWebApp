import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, setLogout } from "../../../state";
import CouponFormValues from "../../../interfaces/Coupon";
import { couponInitialValues, couponSchema } from "../../../validationSchemas/couponValidation";

const CreateCoupon = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: AuthState) => state.token);

  const handleSubmit = async (values: CouponFormValues) => {
    try {
      await axios.post("http://localhost/api/coupons", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Coupon created!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Navigate back to the coupon list page
      navigate("/coupon");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Error creating coupon:", axiosError);
        const response: AxiosResponse<any> | undefined = axiosError.response;
        const errorMessage = response?.data?.error || "An error occurred";

        if (axiosError.response?.status === 401) {
          dispatch(setLogout());
          navigate("/login");
        }

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
      initialValues={couponInitialValues}
      validationSchema={couponSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <br />
        <div className="container border p-3">
          <h1 className="text-dark text-center">Create Coupon</h1>
          <hr />
          <div className="row">
            <div className="col-2">
              <label
                className="control-label pt-2"
                style={{ fontSize: "20px" }}
              >
                Coupon Code
              </label>
            </div>
            <div className="col-10 pb-3">
              <Field name="couponCode" className="form-control" />
              <ErrorMessage
                name="couponCode"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="col-2">
              <label
                className="control-label pt-2"
                style={{ fontSize: "20px" }}
              >
                Discount Amount
              </label>
            </div>
            <div className="col-10 pb-3">
              <Field
                name="discountAmount"
                type="number"
                className="form-control"
              />
              <ErrorMessage
                name="discountAmount"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="col-2">
              <label
                className="control-label pt-2"
                style={{ fontSize: "20px" }}
              >
                Minimum Amount
              </label>
            </div>
            <div className="col-10 pb-3">
              <Field name="minAmount" type="number" className="form-control" />
              <ErrorMessage
                name="minAmount"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="col-5 offset-2" onClick={() => navigate("/coupon")}>
              <a className="btn-primary btn form-control">Back to List</a>
            </div>
            <div className="col-5">
              <button type="submit" className="btn btn-success form-control">
                Create
              </button>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default CreateCoupon;
