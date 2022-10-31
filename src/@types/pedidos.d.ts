import { Produtos } from "./produtos";

export interface Cupons {
  id: number;
  codigo: string;
  desconto: number;
  validade: Date;
}

interface ListaProduto {
  produto: number;
  tamanho: string;
}
export interface Pedidos {
  id: number;
  usuario: number;
  frete: number;
  pagamento: number;
  id_endereco: number;
  desconto: number;
  obs: string;
  produtos: ListaProduto[];
}

export interface FormaEnvio {
  id: number;
  desc: string;
  preco: number;
  previsao_dias: number;
}
