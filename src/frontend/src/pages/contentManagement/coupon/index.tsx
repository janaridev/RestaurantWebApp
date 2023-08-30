import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthState } from "../../../state";

interface Coupon {
  _id: string;
  couponCode: string;
  discountAmount: number;
  minAmount: number | null;
}

const CouponIndex = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const navigate = useNavigate();
  const token = useSelector((state: AuthState) => state.token);

  const deleteCoupon = async (couponId: string) => {
    try {
      await axios.delete(`http://localhost/api/coupons/${couponId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Coupon deleted!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getCoupons();
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

  const getCoupons = async () => {
    try {
      const response = await axios.get<{ result: Coupon[] }>(
        "http://localhost/api/coupons",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setCoupons(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoupons();
  }, []);

  const formatCurrency = (amount: number | null) => {
    if (amount === null) {
      return "-";
    }
    if (typeof amount === "number" && !isNaN(amount)) {
      return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return "-";
  };

  return (
    <div className="card shadow border-0 mt-4">
      <div className="card-header bg-secondary bg-gradient ml-0 py-3">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="text-dark">Coupons List</h1>
          </div>
        </div>
      </div>
      <div className="card-body p-4">
        <div className="row pb-3">
          <div className="col-6"></div>
          <div
            className="col-6 text-end"
            onClick={() => navigate("/coupon/create")}
          >
            <a className="btn btn-outline-primary">
              <i className="bi bi-plus-square"></i> Create New Coupon
            </a>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Coupon Code</th>
              <th>Discount Amount</th>
              <th>Minimum Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td>{coupon.couponCode}</td>
                <td>{formatCurrency(coupon.discountAmount)}</td>
                <td>{formatCurrency(coupon.minAmount)}</td>
                <td>
                  <a
                    className="btn btn-danger"
                    onClick={() => deleteCoupon(coupon._id)}
                  >
                    <i className="bi bi-trash"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponIndex;
