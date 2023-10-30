import React from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { playForward,} from "ionicons/icons";

interface IProps {
  timerStatus: "idle" | "running" | "pause";
  unsetTimer: () => void;
}

const TimerResetButton: React.FC<IProps> = ({ timerStatus, unsetTimer }) => {
  return (
    <IonButton
      color="success"
      expand="full"
      disabled={timerStatus === "running"}
      onClick={() => {
        unsetTimer();
      }}
    >
      <IonIcon icon={playForward} size="large" />
    </IonButton>
  );
};

export default TimerResetButton;
