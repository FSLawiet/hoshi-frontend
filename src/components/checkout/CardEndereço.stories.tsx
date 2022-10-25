import { Meta, StoryObj } from "@storybook/react";
import { CardEndereco, CardEnderecoProps } from "./CardEndereco";

export default {
  title: "Components/CardEndereco",
  component: CardEndereco,
  args: {
    endereco: {
      id: 1,
      nome: "Nome",
      apelido: "Apelido",
      rua: "Rua Tal",
      numero: 25,
      bairro: "Bonito",
      cidade: "Benfica",
      estado: "GO",
      cep: "74000-000",
    },
    handleAdressChange: (event: React.FormEvent<HTMLInputElement>) => {
      alert(event.currentTarget.value);
    },
  },
  argTypes: {},
} as Meta<CardEnderecoProps>;
export const Default: StoryObj<CardEnderecoProps> = {};
