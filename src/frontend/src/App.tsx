import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import Navbar from "./pages/navbar";
import CouponIndex from "./pages/coupon";
import { Container } from "react-bootstrap";
import CreateCoupon from "./pages/coupon/CreateCoupon";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useSelector } from "react-redux";
import { AuthState } from "./state";

const App = () => {
  const role = useSelector((state: AuthState) => state.role);

  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Coupon */}
          <Route
            path="/coupon"
            element={role === "Admin" ? <CouponIndex /> : <Navigate to="/" />}
          />
          <Route path="/coupon/create" element={<CreateCoupon />} />

          {/* Auth */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer />
      </Container>
    </>
  );
};

export default App;
