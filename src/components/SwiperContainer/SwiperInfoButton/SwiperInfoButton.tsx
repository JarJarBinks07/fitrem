import { IonButton, IonIcon } from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";
import React from "react";

interface IProps {
  playStatus: boolean;
  setPlayStatus: (value: boolean) => void;
  setIsOpenModalExercise: React.Dispatch<React.SetStateAction<boolean>>;
  setTimerStatusForTraining: (value: "start" | "pause") => void;
}

const SwiperInfoButton: React.FC<IProps> = ({
  playStatus,
  setPlayStatus,
  setIsOpenModalExercise,
  setTimerStatusForTraining,
}) => {
  return (
    <IonButton
      className="swiper__btn_info"
      onClick={() => {
        setIsOpenModalExercise(true);
        setTimerStatusForTraining("pause");
        playStatus ? setPlayStatus(false) : null;
      }}
    >
      <IonIcon className="swiper__icon_info" slot="icon-only" icon={informationCircleOutline}></IonIcon>
    </IonButton>
  );
};

export default SwiperInfoButton;
