import React, { useEffect, useState } from "react";
import _ from "lodash";
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
  IonMenuToggle,
  IonButton,
  IonIcon,
} from "@ionic/react";

import TimerFace from "./components/TimerFace";
import TimerPlayButton from "./components/TimerPlayButton";
import { useCombineStates } from "../../store/useCombineStates";
import MainMenu from "../../components/Menu/ProfileMenu";
import FooterButtons from "../../components/Footer/FooterButtons";
import TimerResetButton from "./components/TimerResetButton";
import { setTimerLocalNotification, unsetTimerLocalNotifications } from "../../shared/constants/notification.constants";
import { CombineState } from "../../store/useCombineStates";
import SwiperContainer from "../../components/SwiperContainer/SwiperContainer";
import { personCircle } from "ionicons/icons";
import ProfileMenu from "../../components/Menu/ProfileMenu";
import ListDoneExercises from "../../components/ListDoneExercises/ListDoneExercises";
import { useWatcher } from "../../shared/hooks/useWatcher";
import ModalWindowsStatistic from "../../components/ModalWindows/ModalWindowStatistic/ModalWindowStatistic";

const TimerPage: React.FC = () => {
  const {
    notificationStatus,
    timerNotificationInterval,
    timerNotificationStatus,
    timerNotificationKey,
    timeNotificationDuration,
    timeNotificationAfterPause,
    doneExercisesDuringSession,
    setTimerNotificationStatus,
    setTimeNotificationDuration,
    setTimeNotificationAfterPause,
    unsetNotificationTimer,
  } = useCombineStates();

  // use for stopping and resuming timer and video when user switches in App
  const { setOnBlur } = useWatcher();

  const pauseButtonHandler = () => {
    setTimerNotificationStatus("pause");
    setTimeNotificationAfterPause();
    unsetTimerLocalNotifications();
  };

  const playButtonHandler = () => {
    if (timeNotificationDuration) {
      setTimeNotificationDuration(timeNotificationAfterPause);
      setTimerLocalNotification(timeNotificationAfterPause);
    } else {
      //value must be in milliseconds
      setTimeNotificationDuration(timerNotificationInterval * 60000);
      setTimerLocalNotification(timerNotificationInterval * 60000);
    }
    setTimerNotificationStatus("running");
  };

  return (
    <>
      <ProfileMenu />
      <IonPage id="profile">
        <IonHeader>
          <IonToolbar color="warning">
            <IonButtons slot="primary">
              <IonMenuToggle>
                <IonButton className="timer-page__profile_btn" onClick={() => setOnBlur()}>
                  <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
                </IonButton>
              </IonMenuToggle>
            </IonButtons>
            <IonTitle className="timer-page__title">Timer</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {notificationStatus ? (
            // counterActiveTracks === counterDoneExercises
            <IonGrid>
              <IonRow>
                <IonCol className="timer-page__content">
                  <TimerFace
                    timerKey={timerNotificationKey}
                    timerInterval={timerNotificationInterval}
                    timerDuration={
                      timeNotificationAfterPause ? timeNotificationAfterPause : timeNotificationDuration - Date.now()
                    }
                    timerActive={timerNotificationStatus === "running"}
                    unsetTimer={unsetNotificationTimer}
                    size={280}
                    strokeWidth={22}
                    colors={["#ffc409", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[7, 5, 2, 0]}
                  />
                </IonCol>
              </IonRow>
              <IonRow className="ion-text-center">
                <IonCol>
                  <TimerPlayButton
                    timerHandler={timerNotificationStatus === "running" ? pauseButtonHandler : playButtonHandler}
                    timerStatus={timerNotificationStatus}
                  />
                </IonCol>
                <IonCol>
                  <TimerResetButton unsetTimer={unsetNotificationTimer} timerStatus={timerNotificationStatus} />
                </IonCol>
              </IonRow>
            </IonGrid>
          ) : (
            <SwiperContainer />
          )}
          {doneExercisesDuringSession.length
            ? doneExercisesDuringSession.map((e) => (
                <ListDoneExercises key={e.id} category={e.category} exercise={e.exercise} path={e.image_path} />
              ))
            : null}
        </IonContent>
      </IonPage>
    </>
  );
};

export default TimerPage;
