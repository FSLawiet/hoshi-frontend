import "./CardFrete.css";

export interface CardFreteProps {
  id: number;
  nome: string;
  preco: number;
  previsao: number;
  handleFormaEnvioChange: (event: React.FormEvent<HTMLInputElement>) => void;
  checked: number;
}

export const CardFrete = ({
  id,
  nome,
  preco,
  previsao,
  handleFormaEnvioChange,
  checked,
}: CardFreteProps) => {
  return (
    <label htmlFor={"envio_frete_" + id}>
      <div className="card_envio">
        <input
          type="radio"
          name="envio_frete"
          id={"envio_frete_" + id}
          value={id}
          onChange={handleFormaEnvioChange}
          checked={checked === id}
        />
        <span className="envio_nome">{nome}</span>
        <p className="envio_preco">
          {preco !== 0 ? `R$ ${preco.toFixed(2)}` : "Grátis"}
        </p>
        <p className="envio_previsao">
          {previsao > 1 ? `Previsão: até ${previsao} dias úteis` : ""}
        </p>
      </div>
    </label>
  );
};
