import React from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { playSharp, pauseSharp } from "ionicons/icons";
interface IProps {
  timerStatus: "idle" | "running" | "pause";
  timerHandler: () => void;
}

const TimerPlayButton: React.FC<IProps> = ({ timerStatus, timerHandler }) => {
  return (
    <IonButton color="danger" expand="full" onClick={timerHandler}>
      <IonIcon icon={timerStatus === "running" ? pauseSharp : playSharp} size="large" />
    </IonButton>
  );
};

export default TimerPlayButton;
