import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import Navbar from "./pages/navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
