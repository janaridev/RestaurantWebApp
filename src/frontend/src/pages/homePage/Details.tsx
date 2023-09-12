import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import Product from "../../interfaces/Product";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import { useSelector } from "react-redux";
import { AuthState } from "../../state";
import { toast } from "react-toastify";
import {
  ProductCountInput,
  countInitialValue,
  productCountSchema,
} from "../../validationSchemas/detailsValidation";

interface Cart {
  cartHeader: CartHeader;
  cartDetails: Array<CartDetails>;
}

interface CartHeader {
  userId: string | null;
}

interface CartDetails {
  productId: string | undefined;
  count: number;
}

const Details = () => {
  const id = useSelector((state: AuthState) => state.id);
  const token = useSelector((state: AuthState) => state.token);
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | undefined>();

  const upsertValues: Cart = {
    cartHeader: {
      userId: id,
    },
    cartDetails: [
      {
        productId,
        count: 1,
      },
    ],
  };

  const getProduct = async () => {
    try {
      const response = await axios.get<{ result: Product }>(
        `http://localhost/api/products/${productId}`
      );
      setProduct(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [productId]); // Added productId as a dependency

  const handleSubmit = async (initialValue: ProductCountInput) => {
    try {
      upsertValues.cartDetails[0].count = initialValue.count;

      await axios.post("http://localhost/api/cart/upsert", upsertValues, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product was added to your cart !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Error upserting product to the cart:", axiosError);
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
        toast.error("An error occurred", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const formik = useFormik({
    initialValues: countInitialValue,
    validationSchema: productCountSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="pt-4">
      <div className="card container" style={{ border: "1px solid #808080" }}>
        <div
          className="card-header bg-dark text-light row"
          style={{ borderRadius: "0px" }}
        >
          <div className="col-12 col-md-6">
            <h1 className="text-white">{product?.name}</h1>
          </div>
          <div className="col-12 col-md-6 text-end">
            <h1 className="text-warning">
              {product?.price && formatCurrency(product.price)}
            </h1>
          </div>
        </div>
        <div className="card-body">
          <div className="container rounded p-2">
            <div className="row">
              <div className="col-12 col-lg-4 p-1 text-center">
                <img
                  src={product?.imageUrl}
                  style={{ borderRadius: "35px" }}
                  width="100%"
                  className="rounded"
                  alt={product?.name}
                />
              </div>
              <div className="col-12 col-lg-8">
                <div className="row pl-3">
                  <div className="col-12">
                    <span className="badge bg-primary text-success p-3 border">
                      {product?.categoryName}
                    </span>
                    <p className="text-secondary pt-3">
                      {product?.description}
                    </p>
                  </div>
                </div>
                <div className="row mx-0">
                  <FormikProvider value={formik}>
                    <Form method="post">
                      <Field
                        name="count"
                        type="number"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="count"
                        component="div"
                        className="text-danger"
                      />
                    </Form>
                  </FormikProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer row bg-dark">
          <div className="col-12 col-md-6">
            <button
              onClick={() => navigate("/")}
              className="btn btn-success btn-square form-control btn-lg"
              style={{ height: "50px", paddingTop: "12px" }}
            >
              Back to list
            </button>
          </div>
          <div className="col-12 col-md-6">
            <FormikProvider value={formik}>
              <Form method="post">
                <button
                  type="submit"
                  className="btn btn-primary form-control btn-lg"
                  style={{ height: "50px", paddingTop: "12px" }}
                >
                  Add to Cart
                </button>
              </Form>
            </FormikProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
