import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import Navbar from "./pages/navbar";
import CouponIndex from "./pages/coupon";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coupon" element={<CouponIndex />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
