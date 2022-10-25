import { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
}

export const Button = ({ type, children, onClick }: ButtonProps) => {
  return (
    <button className="produto-btn-adicionar" type={type} onClick={onClick}>
      {children}
    </button>
  );
};
