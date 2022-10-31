import { ProductContextProvider } from "./context/produtosContext";
import "./App.style.css";
import { Navbar } from "./components/navbar/Navbar";
import { Router } from "./routes/Router";
import { Footer } from "./components/footer/Footer";

export const App = () => {
  return (
    <ProductContextProvider>
      <Navbar />
      <Router />
      <Footer />
    </ProductContextProvider>
  );
};
