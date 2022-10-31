import { CardFrete } from "./CardFrete";
import { FormDesconto } from "./FormDesconto";
import "./CheckoutResumo.css";
import { FormaEnvio } from "../../@types/pedidos";

export interface CheckoutResumoProps {
  subtotal: number;
  desconto: number;
  forma_envio: FormaEnvio[];
  forma_envio_selec: FormaEnvio;
  handleDesconto: (
    event: React.FormEvent<HTMLButtonElement>,
    codigo: string
  ) => void;
  handleFormaEnvioChange: (event: React.FormEvent<HTMLInputElement>) => void;
  validateForm: boolean;
}

export const CheckoutResumo = ({
  subtotal,
  desconto,
  forma_envio,
  forma_envio_selec,
  handleDesconto,
  handleFormaEnvioChange,
  validateForm,
}: CheckoutResumoProps) => {
  const showDesconto = () => {
    if (desconto !== 1) {
      return (
        <>
          <td className="row-div">
            <p className="prices-header">Desconto</p>
          </td>
          <td className="row-div">
            <p className="prices">- R$ {(subtotal * desconto).toFixed(2)}</p>
          </td>
        </>
      );
    } else {
      return (
        <td colSpan={2} className="row-div" id="desconto">
          <FormDesconto handleDesconto={handleDesconto} />
        </td>
      );
    }
  };

  const Calc = (
    subtotal: number,
    preco_envio: number,
    prestacoes: number,
    desconto?: number
  ) => {
    let result = 0;
    if (desconto) result = subtotal - subtotal * desconto + preco_envio;
    else result = subtotal + preco_envio;

    return (result / prestacoes).toFixed(2);
  };

  return (
    <section id="resumo">
      <h2>Resumo</h2>
      <table cellSpacing="0" cellPadding="0">
        <tbody>
          <tr>
            <td className="row-div">
              <p className="prices-header">Subtotal</p>
            </td>
            <td className="row-div">
              <p className="prices">R$ {subtotal.toFixed(2)}</p>
            </td>
          </tr>
          <tr>{showDesconto()}</tr>
          <tr>
            <td className="row-div">
              <p className="prices-header">{forma_envio_selec.desc}</p>
            </td>
            <td className="row-div">
              <p className="prices">
                {forma_envio_selec.preco > 0
                  ? "+ R$ " + forma_envio_selec.preco.toFixed(2)
                  : "Grátis"}
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="prices-header total-header">Total do Pedido</p>
            </td>
            <td>
              <p className="prices total">
                R${" "}
                {desconto !== 1
                  ? Calc(subtotal, forma_envio_selec.preco, 1, desconto)
                  : Calc(subtotal, forma_envio_selec.preco, 1)}
              </p>
              <p className="prices">
                em até 3X de R${" "}
                {desconto !== 1
                  ? Calc(subtotal, forma_envio_selec.preco, 3, desconto)
                  : Calc(subtotal, forma_envio_selec.preco, 3)}
              </p>
              <p className="prices">
                ou R${" "}
                {desconto !== 1
                  ? Calc(subtotal, forma_envio_selec.preco, 1, desconto)
                  : Calc(subtotal, forma_envio_selec.preco, 1)}{" "}
                no
              </p>
              <p className="prices">
                depósito ou transferência com % de desconto
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="envio_cont">
        {forma_envio.map((fe, i) => (
          <div key={i}>
            <CardFrete
              id={fe.id}
              nome={fe.desc}
              preco={fe.preco}
              previsao={fe.previsao_dias}
              handleFormaEnvioChange={handleFormaEnvioChange}
              checked={forma_envio_selec.id}
            />
          </div>
        ))}
      </div>
      <input
        id="submit"
        className={validateForm ? "button" : "button inactive"}
        type="submit"
        value="Finalizar Compra"
      />
    </section>
  );
};
