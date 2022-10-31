import React from "react";
import { useState } from "react";
import "./FormDesconto.css";

export interface FormDescontoProps {
  handleDesconto: (
    event: React.FormEvent<HTMLButtonElement>,
    codigoInput: string
  ) => void;
}

export const FormDesconto = ({ handleDesconto }: FormDescontoProps) => {
  const [codigoInput, setCodigoInput] = useState("");

  return (
    <label htmlFor="desconto_input">
      Possui cupom de desconto?
      <div id="desconto_fields">
        <input
          type="text"
          id="desconto_input"
          name="desconto"
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setCodigoInput(e.currentTarget.value)
          }
          value={codigoInput}
        />
        <button
          className="button"
          id="desconto_button"
          onClick={(e: React.FormEvent<HTMLButtonElement>) =>
            handleDesconto(e, codigoInput)
          }
        >
          Validar
        </button>
      </div>
    </label>
  );
};
