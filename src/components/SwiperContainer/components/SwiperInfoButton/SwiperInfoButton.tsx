import { IonButton, IonIcon } from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";
import React from "react";

interface IProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOnBlur: (setModal: (value: boolean) => void) => void;
}

const SwiperInfoButton: React.FC<IProps> = ({ setIsOpen, setOnBlur }) => {
  return (
    <>
      <IonButton
        id="info-btn"
        className="swiper__btn_info info-button"
        onClick={() => {
          setOnBlur(setIsOpen);
        }}
      >
        <IonIcon className="swiper__icon_info" slot="icon-only" icon={informationCircleOutline}></IonIcon>
      </IonButton>
    </>
  );
};

export default SwiperInfoButton;
