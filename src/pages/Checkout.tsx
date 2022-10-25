import { useContext, useState, useEffect, FormEvent } from "react";
import { CheckoutPedido } from "../components/checkout/CheckoutPedido";
import { CheckoutEnvio } from "../components/checkout/CheckoutEnvio";
import { CheckoutResumo } from "../components/checkout/CheckoutResumo";
import axios from "axios";
import { ProductContext } from "../context/produtosContext";

import "./Checkout.css";
import { Produtos, ProdutosContextType } from "../@types/produtos";
import { Cupons } from "../@types/pedidos";

export const Checkout = () => {
  const { selectItens, removeItemCart } = useContext(
    ProductContext
  ) as ProdutosContextType;

  const [cupons, setCupons] = useState([]);
  useEffect(() => {
    axios({
      url: "https://hoshi-api.herokuapp.com/cupons",
      method: "get",
    }).then((resp) => {
      setCupons(resp.data);
    });
  }, []);

  //objeto fixo de usuário (com os endereços)
  const [usuario, setUsuario] = useState({
    id: 1,
    nome: "Robsonvaldo",
    username: "robson_kallisti",
    senha: "oooooooooooooooh",
    email:
      "robson_kallisti@watmail.com                                                                         ",
    telefone: "+5562981380914",
    enderecos: [
      {
        id: 1,
        nome: "Robsonvaldo",
        apelido: "Casa",
        rua: "Alameda dos Jacarandás",
        numero: 140,
        bairro: "São Luiz",
        cidade: "Belo Horizonte",
        estado: "MG",
        cep: "31275060",
        usuario: 1,
      },
      {
        id: 2,
        nome: "Celeste",
        apelido: "Trabalho",
        rua: "Alameda dos Jacarandás",
        numero: 140,
        bairro: "São Luiz",
        cidade: "Belo Horizonte",
        estado: "MG",
        cep: "31275060",
        usuario: 1,
      },
    ],
  });

  useEffect(() => {
    axios({
      url: "https://hoshi-api.herokuapp.com/users?id=1",
      method: "get",
    }).then((resp) => {
      setUsuario(resp.data);
    });
  }, []);

  const [subtotal, setSubtotal] = useState<number>(0);
  useEffect(() => {
    setSubtotal(calcSubtotal());
  }, []);
  const calcSubtotal = () => {
    let sum: number[] = [];
    selectItens.forEach((item) => {
      sum.push(parseInt(item.valor.toString()));
    });
    return sum.reduce((a, p) => a + p, 0);
  };

  const [compra, setCompra] = useState({
    adr_id: 0,
    forma_envio: 1,
    obs: "",
    forma_pagamento: 0,
    desconto: 1,
  });

  const handleAdressChange = (event: React.FormEvent<HTMLInputElement>) => {
    setCompra({
      adr_id: parseInt(event.currentTarget.value),
      forma_envio: compra.forma_envio,
      obs: compra.obs,
      forma_pagamento: compra.forma_pagamento,
      desconto: compra.desconto,
    });
  };

  const handleFormaEnvioChange = (event: React.FormEvent<HTMLInputElement>) => {
    setCompra({
      adr_id: compra.adr_id,
      forma_envio: parseInt(event.currentTarget.value),
      obs: compra.obs,
      forma_pagamento: compra.forma_pagamento,
      desconto: compra.desconto,
    });
  };

  const handleObsChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setCompra({
      adr_id: compra.adr_id,
      forma_envio: compra.forma_envio,
      obs: event.currentTarget.value,
      forma_pagamento: compra.forma_pagamento,
      desconto: compra.desconto,
    });
  };

  const handleFormaPagamentoChange = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    setCompra({
      adr_id: compra.adr_id,
      forma_envio: compra.forma_envio,
      obs: compra.obs,
      forma_pagamento: parseInt(event.currentTarget.value),
      desconto: compra.desconto,
    });
  };

  const handleDesconto = (
    event: React.FormEvent<HTMLButtonElement>,
    codigo: string
  ) => {
    event.preventDefault();
    cupons.forEach((cupom: Cupons) => {
      if (cupom.codigo === codigo) {
        setCompra({
          adr_id: compra.adr_id,
          forma_envio: compra.forma_envio,
          obs: compra.obs,
          forma_pagamento: compra.forma_pagamento,
          desconto: cupom.desconto,
        });
      }
    });
  };

  //função de finalização da compra
  const handleCompra = async (
    event: React.FormEvent<HTMLFormElement>,
    valid: boolean
  ) => {
    //TODO
    event.preventDefault();

    if (valid) {
      const produtos: { produto: number; tamanho: string | undefined }[] = [];
      selectItens.forEach((item: Produtos) => {
        produtos.push({
          produto: item.id,
          tamanho: item.tamanho,
        });
      });

      const pedido = {
        usuario: usuario.id,
        adr_id: compra.adr_id,
        forma_envio: compra.forma_envio,
        obs: compra.obs,
        forma_pagamento: compra.forma_pagamento,
        desconto: compra.desconto,
        produtos: produtos,
      };
      axios({
        url: "https://hoshi-api.herokuapp.com/pedidos",
        method: "post",
        data: pedido,
      })
        .then((resp) => alert("Compra Finalizada!\n" + resp.data.data))
        .catch((error) => alert("Erro na compra!\n" + error));
    } else return null;
  };

  //formas de envio (fixas, banco de dados?)
  const forma_envio = [
    {
      id: 1,
      desc: "Retirada no local",
      preco: 0.0,
      previsao_dias: 0,
    },
    {
      id: 2,
      desc: "PAC",
      preco: 32.2,
      previsao_dias: 3,
    },
    {
      id: 3,
      desc: "SEDEX",
      preco: 39.52,
      previsao_dias: 2,
    },
  ];

  return (
    <main>
      <form
        method="POST"
        onSubmit={
          compra.adr_id === 0 ||
          compra.forma_pagamento === 0 ||
          selectItens.length === 0
            ? (e: FormEvent<HTMLFormElement>) => handleCompra(e, false)
            : (e: FormEvent<HTMLFormElement>) => handleCompra(e, true)
        }
      >
        <CheckoutPedido
          pedidos={selectItens}
          handleDeletePedido={removeItemCart}
        />
        <CheckoutEnvio
          usuario={usuario}
          handleAdressChange={handleAdressChange}
          handleFormaPagamentoChange={handleFormaPagamentoChange}
          handleObsChange={handleObsChange}
        />
        <CheckoutResumo
          subtotal={subtotal}
          desconto={compra.desconto}
          forma_envio={forma_envio}
          forma_envio_selec={
            forma_envio.filter((fe) => fe.id === compra.forma_envio)[0]
          }
          handleDesconto={handleDesconto}
          handleFormaEnvioChange={handleFormaEnvioChange}
          validateForm={
            compra.adr_id === 0 ||
            compra.forma_pagamento === 0 ||
            selectItens.length === 0
              ? false
              : true
          }
        />
      </form>
    </main>
  );
};
