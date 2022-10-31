import * as React from "react";
import { Produtos, ProdutosContextType } from "../@types/produtos";

export const ProductContext = React.createContext<ProdutosContextType | null>(
  null
);

interface Props {
  children: React.ReactNode;
}

export const ProductContextProvider: React.FC<Props> = ({
  children,
}: Props) => {
  const [selectItens, setSelectItens] = React.useState<Produtos[]>([]);

  function addItemCart(value: string, item: Produtos) {
    let contains = false;

    if (!selectItens.length) {
      setSelectItens((prev) => [...prev, { ...item, tamanho: value }]);
      return;
    }

    selectItens.forEach((element: Produtos) => {
      if (element.id === item.id) {
        console.log("Tem iguais");
        alert("Produto já existe!");
        contains = true;
        return;
      }
    });
    if (!contains)
      setSelectItens((prev) => [...prev, { ...item, tamanho: value }]);
  }

  function removeItemCart(item: number) {
    const newSelectItens = selectItens.filter(
      (element: Produtos) => item !== element.id && element
    );

    setSelectItens(newSelectItens);
  }

  return (
    <ProductContext.Provider
      value={{ selectItens, addItemCart, removeItemCart }}
    >
      {children}
    </ProductContext.Provider>
  );
};
