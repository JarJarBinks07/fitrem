import { IonIcon } from "@ionic/react";
import { caretBack, caretForward, chevronBack, chevronForward } from "ionicons/icons";
import React from "react";
import ISwiper from "swiper";

import "./SwiperNavigationButtons.css";

interface IProps {
  swiper: ISwiper;
  swiperTrackIndex: number;
  activeCategoryLength: number;
}

const SwiperNavigationButtons: React.FC<IProps> = ({ swiper, swiperTrackIndex, activeCategoryLength }) => {
  return (
    <div>
      {swiperTrackIndex !== 0 ? (
        <button
          className="swiper__btn swiper__btn_prev"
          onClick={() => {
            swiper.slidePrev();
          }}
        >
          <IonIcon icon={chevronBack} className="swiper__icon swiper__icon_left" />
        </button>
      ) : null}

      {swiperTrackIndex !== activeCategoryLength - 1 ? (
        <button
          className=" swiper__btn swiper__btn_next"
          onClick={() => {
            swiper.slideNext();
          }}
        >
          <IonIcon icon={chevronForward} size="large" className="swiper__icon swiper__icon_right" />
        </button>
      ) : null}
    </div>
  );
};

export default SwiperNavigationButtons;
