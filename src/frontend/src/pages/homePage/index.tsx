import axios from "axios";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import Product from "../../interfaces/Product";

interface ProductWithId extends Product {
  _id: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<ProductWithId[]>([]);

  const getProducts = async () => {
    try {
      const response = await axios.get<{ result: ProductWithId[] }>(
        "http://localhost/api/products"
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

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        {products.map((product, index) => {
          return (
            <div className="col-4 mb-4" key={index}>
              <div className="card h-100">
                <h3 className="card-title text-dark-50 text-center py-2">
                  {product.name}
                </h3>
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between py-2">
                    <span className="text-danger" style={{ fontSize: "20px" }}>
                      {formatCurrency(product.price)}
                    </span>
                    <span className="badge bg-warning text-dark p-2">
                      {product.categoryName}
                    </span>
                  </div>
                  <p className="card-text flex-grow-1">{product.description}</p>
                  <div className="mt-auto">
                    <a
                      className="btn btn-success form-control"
                      href={`/details/${product._id}`}
                    >
                      Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
