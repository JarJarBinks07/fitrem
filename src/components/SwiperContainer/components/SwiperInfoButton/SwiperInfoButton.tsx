import { IonButton, IonIcon } from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";
import React from "react";
import { useCombineStates } from "../../../../store/useCombineStates";

interface IProps {
  setIsOpen: (value: boolean) => void;
  setOnBlur: (setModal: (value: boolean) => void) => void;
}

const SwiperInfoButton: React.FC<IProps> = ({ setIsOpen, setOnBlur }) => {
  const { setInfoButtonStatus, introButtonsStatus } = useCombineStates();
  return (
    <>
      <IonButton
        id="info-btn"
        className="swiper__btn_info info-button"
        onClick={() => {
          if (introButtonsStatus.infoBtn) {
            setInfoButtonStatus(false);
          }
          setOnBlur(setIsOpen);
        }}
      >
        <IonIcon id="info-btn" className="swiper__icon_info" slot="icon-only" icon={informationCircleOutline}></IonIcon>
      </IonButton>
    </>
  );
};

export default SwiperInfoButton;
