import { IonIcon } from "@ionic/react";
import { caretBack, caretForward, chevronForward } from "ionicons/icons";
import React from "react";
import ISwiper from "swiper";

import "./SwiperNavigationButtons.css";

interface IProps {
  swiper: ISwiper;
}

const SwiperNavigationButtons: React.FC<IProps> = ({ swiper }) => {
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
        <IonIcon icon={chevronForward} size="large" className="swiper__icon swiper__icon_right" />
      </button>
    </div>
  );
};

export default SwiperNavigationButtons;
