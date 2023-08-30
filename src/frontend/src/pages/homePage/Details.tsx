import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
// import * as yup from "yup";

interface Product {
  name: string;
  price: number;
  description: string;
  categoryName: string;
  imageUrl: string;
}

// interface ProductCountInput {
//   count: number;
// }

// const productCountSchema = yup.object().shape({
//   count: yup
//     .number()
//     .min(1, "Min count of product: 1")
//     .required("Required field."),
// });

const Details = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>();

  const getProduct = async () => {
    try {
      const response = await axios.get<{ result: Product }>(
        `http://localhost/api/products/${productId}`
      );
      console.log(response.data);
      setProduct(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <form method="post">
      <div className=" pt-4">
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
                    <input className="form-control" />
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
              <button
                type="submit"
                className="btn btn-primary form-control btn-lg"
                style={{ height: "50px", paddingTop: "12px" }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Details;
