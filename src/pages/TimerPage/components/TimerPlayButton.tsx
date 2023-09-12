import React from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { playSharp, pauseSharp } from "ionicons/icons";

// Props interface
interface IProps {
  timerStatus: "running" | "idle";
  startTimerHandler: () => void;
}

// Component Declaration
const TimerPlayButton: React.FC<IProps> = (props) => {
  return (
    <IonButton color="success" expand="full" onClick={props.startTimerHandler}>
      <IonIcon icon={props.timerStatus === "running" ? pauseSharp : playSharp} />
    </IonButton>
  );
};

// Component export
export default TimerPlayButton;
