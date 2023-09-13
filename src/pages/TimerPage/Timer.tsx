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

const TimerPage: React.FC = () => {
  const { timerStatus, startTimerHandler, timerConfiguration, remainingTime, setRemainingTime } =
    useCombineStates();

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
                  key={0}
                  workInterval={timerConfiguration}
                  timerEnds={0}
                  timerActive={timerStatus === "running"}
                  resetTimer={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  reactivated={0}
                  remainingTime={remainingTime}
                  setRemainingTime={setRemainingTime}
                />
              </IonCol>
            </IonRow>
            <IonRow className="ion-text-center">
              <IonCol>
                <TimerPlayButton timerStatus={timerStatus} startTimerHandler={startTimerHandler} />
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
