import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Product } from "../pages/Product";
import { Login } from "../pages/Login";
import { Checkout } from "../pages/Checkout";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};
