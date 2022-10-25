export interface Enderecos {
  id: number;
  nome: string;
  apelido: string;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface Usuarios {
  id: number;
  nome: string;
  username: string;
  senha: string;
  email: string;
  telefone: string;
  enderecos: Enderecos[];
}
