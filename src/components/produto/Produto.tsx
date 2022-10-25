import React, { useContext, useState } from "react";

import "./Produto.css";
import { Button } from "./Button";
import { ProductContext } from "../../context/produtosContext";
import { useNavigate } from "react-router-dom";
import { Produtos, ProdutosContextType } from "../../@types/produtos";

export interface ProdutoProps {
  item: Produtos;
}

export const Produto = ({ item }: ProdutoProps) => {
  const { addItemCart } = useContext(ProductContext) as ProdutosContextType;
  const [size, setSize] = useState("");

  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.currentTarget.value);
  };

  function handleSizeSelect(
    e: React.FormEvent<HTMLFormElement>,
    item: Produtos
  ) {
    e.preventDefault();

    switch (size) {
      case "G":
        addItemCart("G", item);
        break;

      case "M":
        addItemCart("M", item);
        break;

      case "P":
        addItemCart("P", item);
        break;

      default:
        break;
    }
  }

  return (
    <section className="produto-container">
      <div className="image">
        <img src={"data:image/png;base64," + item.img} alt={item.peca} />
      </div>
      <div className="description">
        <h1>{item.peca}</h1>
        <div className="valor__parcelas">
          <p>R$ {item.valor}</p>
          <p>em até 3x R$ {(item.valor / 3).toFixed(2)}</p>
        </div>
        <div className="tamanhos">
          <p>Escolha o tamanho</p>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              handleSizeSelect(e, item)
            }
            className="Form__container"
          >
            <section className="Section__buttons">
              <input
                type="radio"
                name="size"
                id="G"
                value={"G"}
                onChange={onChange}
              />
              <label className="Size__Button" htmlFor="G">
                G
              </label>
              <input type="radio" name="size" id="M" value={"M"} />
              <label className="Size__Button" htmlFor="M">
                M
              </label>
              <input type="radio" name="size" id="P" value={"P"} />
              <label className="Size__Button" htmlFor="P">
                P
              </label>
            </section>
            <Button type={"submit"}>Adicionar à Sacola</Button>
            <Button onClick={() => navigate("/")}>Continuar Comprando</Button>
          </form>
        </div>
      </div>
    </section>
  );
};
