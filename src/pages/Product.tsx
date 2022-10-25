import { Produto } from "../components/produto/Produto";
import { Relacionados } from "../components/relacionados/Relacionados";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Categorias, Produtos } from "../@types/produtos";

export const Product = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState<Produtos>();
  const [relacionados, setRelacionados] = useState<
    { produtos: any[]; categoria: string }[]
  >([]);
  useEffect(() => {
    axios({
      url: "https://hoshi-api.herokuapp.com/produtos?id=" + id,
      method: "get",
    }).then((resp) => {
      setProduto(resp.data);
      axios({
        url: "https://hoshi-api.herokuapp.com/produtos",
        method: "get",
      }).then((resp_all) => {
        let rel: { produtos: any[]; categoria: string }[] = [];
        resp.data.categorias.forEach((categoria: Categorias) => {
          rel.push({
            produtos: handleRelacionados(resp_all.data, categoria, id),
            categoria: categoria.codigo,
          });
        });
        setRelacionados(rel);
      });
    });
  }, [id]);

  const handleRelacionados = (
    produtos: Produtos[],
    categoria: Categorias,
    id: string | undefined
  ) => {
    let i = 0;
    let relacionados: any[] = [];
    while (i < 5) {
      let x = Math.round(Math.random() * (produtos.length - 1));
      if (
        produtos[x].id !== parseInt(id || "0") &&
        relacionados.indexOf(produtos[x]) === -1
      ) {
        produtos[x].categorias.forEach((cat) => {
          if (cat.codigo === categoria.codigo) relacionados.push(produtos[x]);
        });
        i++;
      }
    }
    return relacionados;
  };

  return (
    <>
      {produto && <Produto item={produto} />}
      {relacionados.map((produtos, idx) => (
        <Relacionados rel={produtos} key={idx} />
      ))}
    </>
  );
};
