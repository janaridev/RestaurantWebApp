import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import Navbar from "./pages/navbar";
import CouponIndex from "./pages/contentManagement/coupon";
import { Container } from "react-bootstrap";
import CreateCoupon from "./pages/contentManagement/coupon/CreateCoupon";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useSelector } from "react-redux";
import { AuthState } from "./state";
import ProductIndex from "./pages/contentManagement/product";
import CreateProduct from "./pages/contentManagement/product/CreateProduct";

const App = () => {
  const role = useSelector((state: AuthState) => state.role);

  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Auth */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* ADMIN PANEL */}
          {/* COUPON */}
          <Route
            path="/coupon"
            element={role === "Admin" ? <CouponIndex /> : <Navigate to="/" />}
          />
          <Route path="/coupon/create" element={<CreateCoupon />} />
          {/* PRODUCT */}
          <Route
            path="/product"
            element={role === "Admin" ? <ProductIndex /> : <Navigate to="/" />}
          />
          <Route
            path="/product/create"
            element={role === "Admin" ? <CreateProduct /> : <Navigate to="/" />}
          />
        </Routes>
        <ToastContainer />
      </Container>
    </>
  );
};

export default App;
