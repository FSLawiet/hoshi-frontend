import Card from "../card/Card";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./Relacionados.css";
import { Produtos } from "../../@types/produtos";

export interface RelacionadosProps {
  rel: { categoria: string; produtos: Produtos[] };
}

export const Relacionados = ({ rel }: RelacionadosProps) => {
  const pathPage = useNavigate();
  const [title, setTitle] = useState("Veja mais peças como essa!");
  useEffect(() => {
    switch (rel.categoria) {
      case "c":
        setTitle("Veja mais camisetas da HOSHI!");
        break;
      default:
        setTitle("Veja mais peças como essa!");
    }
  }, [rel]);

  return (
    <section className="rel">
      <h3>{title}</h3>
      <div className="rel-container">
        <Swiper
          modules={[Navigation, EffectFade]}
          breakpoints={{
            568: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            900: { slidesPerView: 4 },
            1092: { slidesPerView: 5 },
          }}
          grabCursor={true}
          loop={true}
          navigation
        >
          {rel.produtos.map((produto, i) => (
            <SwiperSlide key={i}>
              <Card
                key={i}
                item={produto}
                onClick={() => pathPage(`/product/${produto.id}`)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
