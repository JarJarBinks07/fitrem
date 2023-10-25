import React from "react";
import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, IonItem } from "@ionic/react";
import VideoPlayerReact from "../../PlayerReact/VideoPlayer";

import "./ModalWindowExercise.css";

interface IProps {
  path: string;
  description: string;
  isOpen: boolean;
  timerMode: "preparation" | "training" | "rest";
  disabledPlayDoneButtons?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTimerStatusForTraining?: (value: "start" | "pause") => void;
}

function ModalWindowExercise({
  path,
  description,
  isOpen,
  timerMode,
  disabledPlayDoneButtons,
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
                if (timerMode !== "training") {
                  setTimerStatusForTraining && setTimerStatusForTraining("start");
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
