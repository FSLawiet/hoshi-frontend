import Card from "../card/Card";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Relacionados(produtos) {
  const pathPage = useNavigate();
  const [title, setTitle] = useState("Veja mais peças como essa!");
  useEffect(() => {
    switch (produtos.categoria) {
      case "c":
        setTitle("Veja mais camisetas da HOSHI!");
        break;
      default:
        setTitle("Veja mais peças como essa!");
    }
  }, []);

  return (
    <div>
      <h3>{title}</h3>
      {produtos.produtos.map((produto, i) => {
        <Card
          key={i}
          item={produto}
          onClick={() => pathPage(`/product/${produto.id}`)}
        />;
      })}
    </div>
  );
}
