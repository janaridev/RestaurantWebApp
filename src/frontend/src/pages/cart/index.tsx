import { useEffect, useState } from "react";
import Product from "../../interfaces/Product";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, setLogout } from "../../state";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import * as yup from "yup";
import { ErrorMessage, Field, Formik } from "formik";

interface Cart {
  cartHeader: CartHeader;
  cartDetails: Array<CartDetails>;
}

interface CartHeader {
  cartHeaderId: string;
  userId: string;
  couponCode: string;
  discount: number;
  cartTotal: number | undefined;
}

interface CartDetails {
  cartDetailsId: string;
  cartHeaderId: string;
  productId: string;
  product: ProductWithId;
  count: number;
}

interface ProductWithId extends Product {
  _id: string;
}

interface CouponCodeInput {
  couponCode: string;
}

const couponCodeSchema = yup.object().shape({
  couponCode: yup
    .string()
    .min(3, "Min length of coupon code: 3")
    .required("Required field."),
});

const initialValue: CouponCodeInput = {
  couponCode: "", // Changed initial count to 1
};

const Cart = () => {
  const id = useSelector((state: AuthState) => state.id);
  const token = useSelector((state: AuthState) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cart, setCart] = useState<Cart>();
  const [isCartEmpty, setIsCartEmpty] = useState<Boolean>(true);

  const getCart = async () => {
    try {
      const response = await axios.get<{ result: Cart }>(
        `http://localhost/api/cart/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart(response.data.result);
      if (response.data.result === null) {
        setIsCartEmpty(true);
      } else {
        setIsCartEmpty(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Error getting cart:", axiosError);
        const response: AxiosResponse<any> | undefined = axiosError.response;
        const errorMessage = response?.data?.error || "An error occurred";

        if (axiosError.response?.status === 401) {
          dispatch(setLogout());

          toast.error("Token expired", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          navigate("/login");
        } else {
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
        }
      } else {
        console.error("Unknown error:", error);
        toast.error("An error occured", {
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

  useEffect(() => {
    getCart();
  }, []);

  const deleteCartDetail = async (cartDetailId: string) => {
    try {
      await axios.delete(`http://localhost/api/cart/${cartDetailId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product was deleted from cart!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getCart();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Error deleting product from cart:", axiosError);
        const response: AxiosResponse<any> | undefined = axiosError.response;
        const errorMessage = response?.data?.error || "An error occurred";

        if (axiosError.response?.status === 401) {
          dispatch(setLogout());

          toast.error("Token expired", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          navigate("/login");
        } else {
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
        }
      } else {
        console.error("Unknown error:", error);
        toast.error("An error occured", {
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

  const handleSubmit = async (initialValue: CouponCodeInput) => {
    try {
      await axios.post(
        "http://localhost/api/cart/applyCoupon",
        {
          cartHeader: {
            userId: id,
            couponCode: initialValue.couponCode,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Coupon was applied!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      getCart();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Error while applying coupon:", axiosError);
        const response: AxiosResponse<any> | undefined = axiosError.response;
        const errorMessage = response?.data?.error || "An error occurred";

        if (axiosError.response?.status === 401) {
          dispatch(setLogout());

          toast.error("Token expired", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          navigate("/login");
        } else {
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
        }
      } else {
        console.error("Unknown error:", error);
        toast.error("An error occured", {
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

  return (
    <>
      {isCartEmpty ? (
        <div className="container">
          <div className="row">
            <img
              src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png"
              alt="cart is empty"
            />
          </div>
        </div>
      ) : (
        <div className="">
          <br />
          <div className="card border mt-4 container">
            <div className="card-header bg-dark text-light ml-0 row ">
              <div className="col-6">
                <h3 className="text-success">
                  <i className="bi bi-cart"></i> &nbsp; Shopping Cart
                </h3>
              </div>
              <div className="col-6 text-end">
                <a className="btn btn-outline-warning mt-2 btn-sm" href="/">
                  Continue Shopping
                </a>
              </div>
            </div>
            <div className="card-body">
              <div className=" d-none d-lg-block">
                <div className="row text-info">
                  <div className="col-lg-2"></div>
                  <div className="col-lg-5">Product Details</div>
                  <div className="col-lg-2">Price</div>
                  <div className="col-lg-2">Count</div>
                  <div className="col-lg-1"></div>
                </div>
              </div>
              <hr />

              {cart?.cartDetails.map((cartDetail: CartDetails) => {
                return (
                  <div className="row h-100" key={cartDetail.cartDetailsId}>
                    <div className="col-4 col-md-2 text-center py-2">
                      <img
                        src={cartDetail.product.imageUrl}
                        className="rounded"
                        width="100%"
                      />
                    </div>
                    <div className="col-8 col-md-5">
                      <h5>{cartDetail.product.name}</h5>
                      <div style={{ fontSize: "11px" }}>
                        {cartDetail.product.description}
                      </div>
                    </div>
                    <div
                      className="col-3 col-md-2 pt-md-4"
                      style={{ fontSize: "11px" }}
                    >
                      <span style={{ fontSize: "17px" }}>
                        {formatCurrency(cartDetail.product.price)}
                      </span>
                    </div>
                    <div
                      className="col-3 col-md-2 pt-md-4"
                      style={{ fontSize: "11px" }}
                    >
                      <span style={{ fontSize: "17px" }}>
                        {cartDetail.count}
                      </span>
                    </div>
                    <div
                      className="col-2 col-lg-1 p-0 pt-lg-4 text-center"
                      onClick={() => deleteCartDetail(cartDetail.cartDetailsId)}
                    >
                      <a className="btn btn-sm btn-danger">
                        <i className="bi bi-trash-fill"></i>
                      </a>
                    </div>
                  </div>
                );
              })}

              <hr />
              <div className="row">
                <div className="col-6">
                  <Formik
                    initialValues={initialValue}
                    validationSchema={couponCodeSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ handleSubmit }) => (
                      <form onSubmit={handleSubmit}>
                        <span>Coupon:</span>
                        <Field
                          type="text"
                          name="couponCode"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="couponCode"
                          component="div"
                          className="text-danger"
                        />
                        <button
                          type="submit"
                          className="btn btn-sm btn-success w-100"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                  </Formik>
                </div>
                <div className="col-6 text-end">
                  <span className="text-danger" style={{ fontSize: "21px" }}>
                    {" "}
                    Order Total : {formatCurrency(
                      cart?.cartHeader.cartTotal
                    )}{" "}
                    <br />
                  </span>
                  {cart?.cartHeader.discount !== 0 && (
                    <span className="text-success">
                      Order Discount :
                      {formatCurrency(cart?.cartHeader.discount)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="card-footer row">
              <div className="col-6 col-md-3 ">
                <button
                  type="submit"
                  className="btn btn-outline-danger form-control"
                >
                  Email Cart
                </button>
              </div>
              <div className="col-6 col-md-3 offset-md-6">
                <button disabled className="btn btn-success form-control ">
                  Checkout (Comming Soon!)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
