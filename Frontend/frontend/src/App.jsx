import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Products from "./components/Products";
import ProductsCreate from "./components/ProductsCreate";
import Orders from "./components/Orders";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/wrapper" element={<Wrapper />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products-create" element={<ProductsCreate />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
