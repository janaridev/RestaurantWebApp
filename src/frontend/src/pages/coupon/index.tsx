import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Coupon {
  _id: string;
  couponCode: string;
  discountAmount: number;
  minAmount: number | null;
}

const CouponIndex = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const navigate = useNavigate();

  const getCoupons = async () => {
    try {
      const response = await axios.get<{ result: Coupon[] }>(
        "http://localhost:3010/api/coupons"
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
                  <a className="btn btn-danger">
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
