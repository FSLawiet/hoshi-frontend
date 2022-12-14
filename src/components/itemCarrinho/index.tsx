import { useContext, useEffect, useState } from "react";
import "./style.css";
import { ProductContext } from "../../context/produtosContext";
import { Produtos, ProdutosContextType } from "../../@types/produtos";

export interface ItemCarrinhoProps {
  item: Produtos;
}

export const ItemCarrinho = ({ item }: ItemCarrinhoProps) => {
  const { removeItemCart } = useContext(ProductContext) as ProdutosContextType;

  const [mult, setMult] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(mult * item.valor);
  }, [mult, item]);

  return (
    <>
      <div className="Teste1234">
        <div className="Imagem">
          <img
            src={"data:image/png;base64," + item.img}
            alt="img"
            className="Imagem"
          />
        </div>
        <div className="name">
          <h4>{item.peca}:</h4>
          <div className="price">R$ {item.valor}</div>
          <p>Tamanho: {item.tamanho}</p>
          <div className="Adicionar-Remover">
            <button
              onClick={() => setMult(mult - 1)}
              className="Qty__Button"
              disabled={mult <= 1}
            >
              -
            </button>
            <div className="col-qty">{mult}</div>

            <button className="Qty__Button" onClick={() => setMult(mult + 1)}>
              +
            </button>
          </div>
        </div>
        <p
          onClick={() => removeItemCart(item.id)}
          style={{
            textDecoration: "underline",
            color: "red",
            cursor: "pointer",
          }}
        >
          Remover item
        </p>
      </div>
      <div className="total-parcial">Total:{total.toFixed(2)}</div>
      <br />
      <hr />
    </>
  );
};
