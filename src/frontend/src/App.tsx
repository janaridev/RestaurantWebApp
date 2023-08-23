import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import Navbar from "./pages/navbar";
import CouponIndex from "./pages/coupon";
import { Container } from "react-bootstrap";
import CreateCoupon from "./pages/coupon/CreateCoupon";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Coupon */}
          <Route path="/coupon" element={<CouponIndex />} />
          <Route path="/coupon/create" element={<CreateCoupon />} />

          {/* Auth */}
          <Route path="/register" />
          <Route path="/login" />
        </Routes>
        <ToastContainer />
      </Container>
    </>
  );
};

export default App;
