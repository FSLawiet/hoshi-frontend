import Card from "../card/Card";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Relacionados.css";

const Relacionados = ({ rel }) => {
  const pathPage = useNavigate();
  const [title, setTitle] = useState("Veja mais peças como essa!");
  useEffect(() => {
    console.log(rel);
    switch (rel.categoria) {
      case "c":
        setTitle("Veja mais camisetas da HOSHI!");
        break;
      default:
        setTitle("Veja mais peças como essa!");
    }
  }, [rel]);

  return (
    <section className="rel">
      <h3>{title}</h3>
      <div className="rel-container">
        {rel.produtos.map((produto, i) => (
          <Card
            key={i}
            item={produto}
            onClick={() => pathPage(`/product/${produto.id}`)}
          />
        ))}
      </div>
    </section>
  );
};
export default Relacionados;
