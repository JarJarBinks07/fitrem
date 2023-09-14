import React from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { playSharp, pauseSharp } from "ionicons/icons";
import {
  setTimerLocalNotification,
  unsetTimerLocalNotifications,
} from "../../../shared/constants/notification.constants";

// Props interface
interface IProps {
  timerStatus: "running" | "idle";
  workInterval: number;
  startTimerHandler: () => void;
  setTimerReactivated: () => void;
}

// Component Declaration
const TimerPlayButton: React.FC<IProps> = ({
  timerStatus,
  workInterval,
  startTimerHandler,
  setTimerReactivated,
}) => {
  const handleClick = () => {
    if (timerStatus === "idle") {
      setTimerLocalNotification(workInterval * 1000);
    } else {
      unsetTimerLocalNotifications();
    }
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
