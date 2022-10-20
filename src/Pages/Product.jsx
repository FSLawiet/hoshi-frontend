import Produto from "../components/produto/Produto";
import { Relacionados } from "../components/relacionados/Relacionados";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//import { Produtos } from "../Data/dataProduct";

function Product() {
  const { id } = useParams();
  const [produto, setProduto] = useState([]);
  useEffect(() => {
    axios({
      url: "https://hoshi-api.herokuapp.com/produtos?id=" + id,
      method: "get",
    }).then((resp) => {
      setProduto(resp.data);
    });
  }, [id]);
  const [relacionados, setRelacionados] = useState([
    { produtos: [], categoria: "" },
  ]);
  useEffect(() => {
    axios({
      url: "https://hoshi-api.herokuapp.com/produtos",
      method: "get",
    }).then((resp) => {
      setRelacionados([]);
      for (categoria of produto.categorias) {
        setRelacionados(
          relacionados.push({
            produtos: handleRelacionados(resp, categoria),
            categoria: categoria.codigo,
          })
        );
      }
    });
  }, []);

  const handleRelacionados = (produtos, categoria) => {
    let i = 0;
    let relacionados = [];
    while (i < 5) {
      let x = Math.round(Math.random() * produtos.length);
      for (cat of produtos[x].categorias) {
        if (cat.codigo === categoria.codigo) {
          relacionados.push(produtos[x]);
        }
      }
    }
    return relacionados;
  };

  return (
    <>
      {produto.map(
        (item, idx) =>
          item.id === Number(id) && <Produto item={item} key={idx} />
      )}
      {relacionados.map((produtos, idx) => (
        <Relacionados produtos={produtos} key={idx} />
      ))}
    </>
  );
}
export default Product;
