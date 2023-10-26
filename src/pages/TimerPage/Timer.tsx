import React, { useEffect, useState } from "react";
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

const TimerPage: React.FC = () => {
  // useEffect(() => {
  //   if (timerDuration - Date.now() < 0) {
  //     unsetTimerLocalNotifications();
  //   }
  // });

  const [status, setStatus] = useState(false);
  const {
    timerNotificationInterval: timerInterval,
    timerNotificationStatus: timerStatus,
    timerNotificationKey: timerKey,
    timeNotificationDuration: timerDuration,
    timeNotificationAfterPause: timeAfterPause,
    setTimerNotificationStatus: setTimerStatus,
    setTimeNotificationDuration: setTimerDuration,
    setTimeNotificationAfterPause: setTimeAfterPause,
    unsetNotificationTimer: unsetTimer,
    savedHistoryDoneExercises,
  } = useCombineStates();

  const { setOnBlur } = useWatcher();

  const pauseButtonHandler = () => {
    setTimerStatus("pause");
    setTimeAfterPause();
    unsetTimerLocalNotifications();
  };

  const playButtonHandler = () => {
    if (timerDuration) {
      setTimerDuration(timeAfterPause);
      setTimerLocalNotification(timeAfterPause);
    } else {
      ////value must be in milliseconds/////
      setTimerDuration(timerInterval * 60000);
      setTimerLocalNotification(timerInterval * 60000);
    }
    setTimerStatus("running");
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
          {status ? (
            <IonGrid>
              <IonRow>
                <IonCol className="timer-page__content">
                  <TimerFace
                    timerKey={timerKey}
                    timerInterval={timerInterval}
                    timerDuration={timeAfterPause ? timeAfterPause : timerDuration - Date.now()}
                    timerActive={timerStatus === "running"}
                    unsetTimer={unsetTimer}
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
                    timerHandler={timerStatus === "running" ? pauseButtonHandler : playButtonHandler}
                    timerStatus={timerStatus}
                  />
                </IonCol>
                <IonCol>
                  <TimerResetButton unsetTimer={unsetTimer} timerStatus={timerStatus} />
                </IonCol>
              </IonRow>
            </IonGrid>
          ) : (
            <SwiperContainer />
          )}
          {savedHistoryDoneExercises.length
            ? savedHistoryDoneExercises.map((e) => (
                <ListDoneExercises key={e.id} category={e.category} exercise={e.exercise} path={e.image_path} />
              ))
            : null}
        </IonContent>
        {/* <FooterButtons /> */}
      </IonPage>
    </>
  );
};

export default TimerPage;
