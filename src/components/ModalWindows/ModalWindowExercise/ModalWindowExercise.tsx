import React from "react";
import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, IonItem } from "@ionic/react";
import VideoPlayerReact from "../../PlayerReact/VideoPlayer";

import "./ModalWindowExercise.css";

interface IProps {
  path: string;
  description: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOnFocus?: (setOpen: (value: boolean) => void) => void;
}

const ModalWindowExercise: React.FC<IProps> = ({ path, description, isOpen, setIsOpen, setOnFocus }: IProps) => {
  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Description</IonTitle>
          <IonButtons slot="end">
            <IonButton
              className="modal__btn"
              onClick={() => {
                setOnFocus ? setOnFocus(setIsOpen) : setIsOpen(false);
              }}
            >
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <VideoPlayerReact play={true} path={path} />
        </IonItem>
        <IonItem className="modal__item" lines="none">
          {description}
        </IonItem>
      </IonContent>
    </IonModal>
  );
};

export default ModalWindowExercise;
