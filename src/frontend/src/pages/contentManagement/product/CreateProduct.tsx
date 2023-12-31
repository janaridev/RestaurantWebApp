import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, setLogout } from "../../../state";
import ProductFormValues from "../../../interfaces/Product";
import {
  productInitialValues,
  productSchema,
} from "../../../validationSchemas/productValidation";

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: AuthState) => state.token);

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      await axios.post("http://localhost/api/products", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product created!", {
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
      navigate("/product");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Error creating product:", axiosError);
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
      initialValues={productInitialValues}
      validationSchema={productSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <br />
        <div className="container border p-3">
          <h1 className="text-dark text-center">Create Product</h1>
          <hr />
          <div className="row">
            <div className="col-2">
              <label
                className="control-label pt-2"
                style={{ fontSize: "20px" }}
              >
                Name
              </label>
            </div>
            <div className="col-10 pb-3">
              <Field name="name" className="form-control" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="col-2">
              <label
                className="control-label pt-2"
                style={{ fontSize: "20px" }}
              >
                Price
              </label>
            </div>
            <div className="col-10 pb-3">
              <Field name="price" type="number" className="form-control" />
              <ErrorMessage
                name="price"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="col-2">
              <label
                className="control-label pt-2"
                style={{ fontSize: "20px" }}
              >
                Description
              </label>
            </div>
            <div className="col-10 pb-3">
              <Field name="description" className="form-control" />
              <ErrorMessage
                name="description"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="col-2">
              <label
                className="control-label pt-2"
                style={{ fontSize: "20px" }}
              >
                Category Name
              </label>
            </div>
            <div className="col-10 pb-3">
              <Field name="categoryName" className="form-control" />
              <ErrorMessage
                name="categoryName"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="col-2">
              <label
                className="control-label pt-2"
                style={{ fontSize: "20px" }}
              >
                Image Url
              </label>
            </div>
            <div className="col-10 pb-3">
              <Field name="imageUrl" className="form-control" />
              <ErrorMessage
                name="imageUrl"
                component="div"
                className="text-danger"
              />
            </div>
            <div
              className="col-5 offset-2"
              onClick={() => navigate("/product")}
            >
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

export default CreateProduct;
