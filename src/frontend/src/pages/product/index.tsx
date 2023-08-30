import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthState } from "../../state";

interface Product {
  _id: string;
  name: string;
  price: number;
  categoryName: string;
}

const ProductIndex = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const token = useSelector((state: AuthState) => state.token);

  const deleteProduct = async (productId: string) => {
    try {
      await axios.delete(`http://localhost/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product deleted!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getProducts();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Error creating product:", axiosError);
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

  const getProducts = async () => {
    try {
      const response = await axios.get<{ result: Product[] }>(
        "http://localhost/api/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setProducts(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
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
            <h1 className="text-dark">Products List</h1>
          </div>
        </div>
      </div>
      <div className="card-body p-4">
        <div className="row pb-3">
          <div className="col-6"></div>
          <div
            className="col-6 text-end"
            onClick={() => navigate("/product/create")}
          >
            <a className="btn btn-outline-primary">
              <i className="bi bi-plus-square"></i> Create New Product
            </a>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category Name</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.categoryName}</td>
                <td>{formatCurrency(product.price)}</td>
                <td>
                  <a
                    className="btn btn-danger"
                    onClick={() => deleteProduct(product._id)}
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

export default ProductIndex;
