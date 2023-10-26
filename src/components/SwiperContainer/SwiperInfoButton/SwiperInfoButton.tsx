import { IonButton, IonIcon } from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";
import React from "react";

interface IProps {
  setIsOpenModalExercise: React.Dispatch<React.SetStateAction<boolean>>;
  setOnBlur: (setModal: (value: boolean) => void) => void;
}

const SwiperInfoButton: React.FC<IProps> = ({ setIsOpenModalExercise, setOnBlur }) => {
  return (
    <IonButton
      className="swiper__btn_info"
      onClick={() => {
        setOnBlur(setIsOpenModalExercise);
      }}
    >
      <IonIcon className="swiper__icon_info" slot="icon-only" icon={informationCircleOutline}></IonIcon>
    </IonButton>
  );
};

export default SwiperInfoButton;
