import React from "react";
import ISwiper from "swiper";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./ModalRewardsWindow.css";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalRewardsWindow: React.FC<IProps> = ({ isOpen, setIsOpen }) => {
  return (
    <IonModal className="modal-statistic" isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Activities & Rewards</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent></IonContent>
    </IonModal>
  );
};

export default ModalRewardsWindow;
