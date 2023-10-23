import React from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonText,
} from "@ionic/react";
import VideoPlayerReact from "../../PlayerReact/VideoPlayer";

import "./ModalWindowExercise.css";

interface IProps {
  path: string;
  description: string;
  isOpen: boolean;
  timerFor?: "working" | "notification";
  disabledMainButtonsExceptTraining?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTimerStatusForTraining?: (value: "pause" | "start") => void;
}

function ModalWindowExercise({
  path,
  description,
  isOpen,
  timerFor,
  disabledMainButtonsExceptTraining,
  setTimerStatusForTraining,
  setIsOpen,
}: IProps) {
  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Description</IonTitle>
          <IonButtons slot="end">
            <IonButton
              className="modal__btn"
              onClick={() => {
                if (timerFor === "working") {
                  if (disabledMainButtonsExceptTraining) {
                    setTimerStatusForTraining("start");
                  }
                }
                setIsOpen(false);
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
}

export default ModalWindowExercise;
