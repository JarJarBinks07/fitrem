import { IonButton, IonIcon } from "@ionic/react";
import { caretBack, caretForward, caretForwardCircleOutline } from "ionicons/icons";
import React from "react";
import { useSwiper } from "swiper/react";

import "./SwiperButton.css";

const SwiperButtons: React.FC = () => {
  const swiper = useSwiper();
  return (
    <div className="test">
      <div className="swiper__container">
        <button
          className="swiper__btn_left"
          onClick={() => {
            swiper.slidePrev();
          }}
        >
          <IonIcon icon={caretBack} className="swiper__icon_left" />
        </button>
        <button
          className="swiper__btn_right"
          onClick={() => {
            swiper.slideNext();
          }}
        >
          <IonIcon icon={caretForward} size="large" className="swiper__icon_right" />
        </button>
      </div>
    </div>
  );
};

export default SwiperButtons;
