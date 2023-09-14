import React from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { playSharp, pauseSharp } from "ionicons/icons";

// Props interface
interface IProps {
  timerStatus: "running" | "idle";
  startTimerHandler: () => void;
  setTimerReactivated: () => void;
}

// Component Declaration
const TimerPlayButton: React.FC<IProps> = ({
  timerStatus,
  startTimerHandler,
  setTimerReactivated,
}) => {
  const handleClick = () => {
    startTimerHandler();
    setTimerReactivated();
  };
  return (
    <IonButton color="success" expand="full" onClick={handleClick}>
      <IonIcon icon={timerStatus === "running" ? pauseSharp : playSharp} />
    </IonButton>
  );
};

// Component export
export default TimerPlayButton;
