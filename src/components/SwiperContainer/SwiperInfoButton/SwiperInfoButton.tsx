import { IonButton, IonIcon } from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";
import React from "react";

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
    >
      <IonIcon className="swiper__icon_info" slot="icon-only" icon={informationCircleOutline}></IonIcon>
    </IonButton>
  );
};

export default SwiperInfoButton;
