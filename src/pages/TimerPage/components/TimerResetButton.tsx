import React from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { syncOutline } from "ionicons/icons";

interface IProps {
  timerStatus: "idle" | "running" | "pause";
  unsetTimer: () => void;
}

const TimerResetButton: React.FC<IProps> = ({ timerStatus, unsetTimer }) => {
  return (
    <IonButton color="danger" expand="full" disabled={timerStatus === "running"} onClick={unsetTimer}>
      <IonIcon icon={syncOutline} size="large" />
    </IonButton>
  );
};

export default TimerResetButton;
