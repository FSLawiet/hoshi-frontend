import {
  IoPersonOutline,
  IoBagOutline,
  IoSearchOutline,
} from "react-icons/io5";
import "./Navbar.css";
import Logo from "./img/Hoshi.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { Carrinho } from "../carrinho/Carrinho";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/produtosContext";
import { ProdutosContextType } from "../../@types/produtos";

export const Navbar = () => {
  const { selectItens } = useContext(ProductContext) as ProdutosContextType;

  const [openModal, setOpenModal] = useState<boolean>(false);
  const cartRef = useRef<HTMLElement>(null);

  const pathPagina = useNavigate();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (cartRef.current && openModal && !cartRef.current.contains(target))
        setOpenModal(false);
    }

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [openModal]);

  return (
    <>
      <nav className="NavBar" ref={cartRef}>
        <div
          onClick={() => {
            pathPagina("/");
          }}
          style={{ cursor: "pointer" }}
        >
          <img className="NavBar__Logo" src={Logo} alt="" />
        </div>
        <ul className="NavBar__Lista">
          <li className="NavBar__Lista--Seção">Populares</li>
          <li className="NavBar__Lista--Seção">Masculino</li>
          <li className="NavBar__Lista--Seção">Feminino</li>
        </ul>
        <div className="NavBar__CampoDeBusca">
          <input type="text" id="search" placeholder="Pesquise aqui" />
          <IoSearchOutline />
        </div>
        <div className="NavBar__Icons">
          <IoPersonOutline
            onClick={() => pathPagina("/login")}
            style={{ cursor: "pointer" }}
          />
          <div>
            <IoBagOutline
              className="NavBar__Icon__bag"
              onClick={() => setOpenModal(!openModal)}
            />
            {selectItens.length > 0 && (
              <sup
                style={{
                  backgroundColor: "#c1b0ec",
                  borderRadius: "50%",
                  display: "inline-block",
                  width: "15.5px",
                  height: "15.5px",
                  textAlign: "center",
                  fontSize: "0.8rem",
                }}
              >
                {selectItens.length}
              </sup>
            )}
          </div>
        </div>
        {openModal && <Carrinho />}
      </nav>
    </>
  );
};
