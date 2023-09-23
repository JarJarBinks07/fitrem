import React from "react";
import "./Timer.css";
import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonMenuButton,
} from "@ionic/react";

import TimerFace from "./components/TimerFace";
import TimerPlayButton from "./components/TimerPlayButton";
import { useCombineStates } from "../../store/useCombineStates";
import MainMenu from "../../components/Menu/MainMenu";
import FooterButtons from "../../components/Footer/FooterButtons";
import TimerResetButton from "./components/TimerResetButton";
import { setTimerLocalNotification, unsetTimerLocalNotifications } from "../../shared/constants/notification.constants";
import { CombineState } from "../../store/useCombineStates";

const TimerPage: React.FC = () => {
  const {
    timerInterval,
    timerStatus,
    timerKey,
    timerDuration,
    timerPausedTime,
    setTimerStatus,
    setTimerDuration,
    setTimerPausedTime,
    unsetTimer,
  } = useCombineStates();

  const pauseButtonHandler = () => {
    setTimerStatus("pause");
    setTimerPausedTime();
    unsetTimerLocalNotifications();
  };

  const playButtonHandler = () => {
    if (timerPausedTime) {
      //get timerPausedTime in milliseconds
      setTimerDuration(timerPausedTime);
      setTimerLocalNotification(timerPausedTime);
    } else {
      //get timerInterval in seconds
      setTimerDuration(timerInterval * 1000);
      setTimerLocalNotification(timerInterval * 1000);
    }
    setTimerStatus("running");
  };

  return (
    <>
      <MainMenu />
      <IonPage id="main-content">
        <IonHeader>
          <IonHeader>
            <IonToolbar color="warning">
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <IonTitle>Timer</IonTitle>
            </IonToolbar>
          </IonHeader>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol className="timer-content">
                <TimerFace
                  timerKey={timerKey}
                  timerInterval={timerInterval}
                  timerDuration={timerPausedTime ? Date.now() + timerPausedTime : timerDuration}
                  timerActive={timerStatus === "running"}
                  unsetTimer={unsetTimer}
                />
              </IonCol>
            </IonRow>
            <IonRow className="ion-text-center">
              <IonCol>
                <TimerPlayButton
                  timerHandler={timerStatus === "running" ? pauseButtonHandler : playButtonHandler}
                  timerStatus={timerStatus}
                />
              </IonCol>
              <IonCol>
                <TimerResetButton unsetTimer={unsetTimer} timerStatus={timerStatus} />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
        <FooterButtons />
      </IonPage>
    </>
  );
};

export default TimerPage;
