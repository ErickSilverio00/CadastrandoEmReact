import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Cliente from "../Cliente";
import "./Setor.css";

import { Pagination } from "swiper/modules";

const Setor = (props) => {
  const css = { backgroundColor: props.corSecundaria };
  const [slidesPerView, setSlidesPerView] = useState(1);

  const aoExcluirCliente = (cliente) => {
    props.aoExcluirCliente(cliente);
  };

  const aoAlterarCliente = (cliente) => {
    props.aoAlterarCliente(cliente);
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 650) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(1);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    props.clientes.length > 0 && (
      <section className="setor" style={css}>
        <h3 style={{ borderColor: props.corPrimaria }}>{props.nome}</h3>
        <div className="clientes">
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[Pagination]}
            className="swiper mySwiper"
            pagination={{ clickable: true }}
            onSlideChange={() => {
              const activeBullet = document.querySelector(".swiper-pagination-bullet-active");
              if (activeBullet) {
                activeBullet.style.backgroundColor = props.corPrimaria;
              }
            }}
            slidesPerView={slidesPerView}
            spaceBetween={30}
          >
            {props.clientes.map((cliente) => (
              <SwiperSlide key={cliente.id}>
                <Cliente
                  className="swiper-slide cliente"
                  corDeFundo={props.corPrimaria}
                  aoExcluirCliente={aoExcluirCliente}
                  aoAlterarCliente={aoAlterarCliente}
                  cliente={cliente}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    )
  );
};

export default Setor;