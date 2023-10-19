import { IonButton } from "@ionic/react";
import React from "react";
import "../SwiperContainer.css";

interface IProps {
  playStatus: boolean;
  changeStatus: () => void;
  setIsOpenModalExercise: React.Dispatch<React.SetStateAction<boolean>>;
}

const SwiperInfoButton: React.FC<IProps> = ({ playStatus, changeStatus, setIsOpenModalExercise }) => {
  return (
    <IonButton
      className="swiper__btn_info"
      onClick={() => {
        setIsOpenModalExercise(true);
        {
          playStatus ? changeStatus() : null;
        }
      }}
    ></IonButton>
  );
};

export default SwiperInfoButton;
