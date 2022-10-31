import { Produtos } from "../../@types/produtos";
import "./Card.css";

export interface CardProps {
  item: Produtos;
  onClick: () => void;
}

export const Card = ({ item, onClick }: CardProps) => {
  return (
    <div className="Card__container" onClick={onClick}>
      <img
        src={"data:image/png;base64," + item.img}
        alt={item.peca}
        className="Card__Image"
      />
      <p>{item.peca}</p>
      <p>R$: {item.valor}</p>
    </div>
  );
};
export default Card;
