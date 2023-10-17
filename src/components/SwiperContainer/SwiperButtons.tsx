import { IonIcon } from "@ionic/react";
import { caretBack, caretForward } from "ionicons/icons";
import React from "react";
import { useSwiper } from "swiper/react";

import "./SwiperButton.css";

const SwiperButtons: React.FC = () => {
  const swiper = useSwiper();
  return (
    <div>
      <button
        className="swiper__btn swiper__btn_prev"
        onClick={() => {
          swiper.slidePrev();
        }}
      >
        <IonIcon icon={caretBack} className="swiper__icon swiper__icon_left" />
      </button>
      <button
        className=" swiper__btn swiper__btn_next"
        onClick={() => {
          swiper.slideNext();
        }}
      >
        <IonIcon icon={caretForward} size="large" className="swiper__icon swiper__icon_right" />
      </button>
    </div>
  );
};

export default SwiperButtons;
