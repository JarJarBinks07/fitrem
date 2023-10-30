import React from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { playForward, playForwardOutline, syncOutline } from "ionicons/icons";
import { useCombineStates } from "../../../store/useCombineStates";

interface IProps {
  timerStatus: "idle" | "running" | "pause";
  unsetTimer: () => void;
}

const TimerResetButton: React.FC<IProps> = ({ timerStatus, unsetTimer }) => {
  const { setCounter } = useCombineStates();
  return (
    <IonButton
      color="success"
      expand="full"
      disabled={timerStatus === "running"}
      onClick={() => {
        unsetTimer();
        setCounter();
      }}
    >
      <IonIcon icon={playForward} size="large" />
    </IonButton>
  );
};

export default TimerResetButton;
