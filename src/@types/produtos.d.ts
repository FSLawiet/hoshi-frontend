export interface Categorias {
  id: number;
  codigo: string;
  descricao: string;
}

export interface Produtos {
  id: number;
  peca: string;
  img: string;
  valor: number;
  tamanho?: string;
  categorias: Categorias[];
}

export type ProdutosContextType = {
  selectItens: Produtos[];
  addItemCart: (value: string, item: Produtos) => void;
  removeItemCart: (item: number) => void;
};
