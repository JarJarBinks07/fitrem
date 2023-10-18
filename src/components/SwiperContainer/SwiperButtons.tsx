import { IonIcon } from "@ionic/react";
import { caretBack, caretForward, chevronForward } from "ionicons/icons";
import React from "react";
import { useSwiper } from "swiper/react";

import "./SwiperButton.css";

interface IProps {
  nextSlide: boolean;
  setNextSlide: (value: boolean) => void;
}

const SwiperButtons: React.FC<IProps> = ({ nextSlide, setNextSlide }) => {
  const swiper = useSwiper();
  if (nextSlide) {
    swiper.slideNext();
    setNextSlide(false);
  }

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

export default SwiperButtons;
