import { Enderecos } from "../../@types/usuarios";
import "./CardEndereco.css";

export interface CardEnderecoProps {
  endereco: Enderecos;
  handleAdressChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

export const CardEndereco = ({
  endereco,
  handleAdressChange,
}: CardEnderecoProps) => {
  return (
    <label htmlFor={`address_${endereco.id}`}>
      <div className="card_endereco">
        <p>
          <em>{endereco.apelido}</em>
        </p>
        <p>
          <strong>{endereco.nome}</strong>
        </p>
        <p>
          {endereco.rua}, {endereco.numero}
        </p>
        <p>
          {endereco.bairro} - {endereco.cidade} - {endereco.estado}
        </p>
        <p>{endereco.cep}</p>
        <p className="endereco_label">
          Endereço para envio{" "}
          <input
            type="radio"
            name="addresss"
            id={`address_${endereco.id}`}
            value={endereco.id}
            onChange={handleAdressChange}
          />
        </p>
      </div>
    </label>
  );
};
