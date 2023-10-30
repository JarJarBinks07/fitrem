import React, { useEffect } from "react";
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
  IonMenuToggle,
  IonButton,
  IonIcon,
} from "@ionic/react";

import TimerFace from "./components/TimerFace";
import TimerPlayButton from "./components/TimerPlayButton";
import { useCombineStates } from "../../store/useCombineStates";
import TimerResetButton from "./components/TimerResetButton";
import { setTimerLocalNotification, unsetTimerLocalNotifications } from "../../shared/constants/notification.constants";
import SwiperContainer from "../../components/SwiperContainer/SwiperContainer";
import { personCircle } from "ionicons/icons";
import ProfileMenu from "../../components/Menu/ProfileMenu";
import { useWatcher } from "../../shared/hooks/useWatcher";
import { App } from "@capacitor/app";

const TimerPage: React.FC = () => {
  const {
    timerMode,
    isNotification,
    timerNotificationInterval,
    timerNotificationStatus,
    timerNotificationKey,
    timeNotificationDuration,
    timeNotificationAfterPause,
    setTimerNotificationStatus,
    setTimeNotificationDuration,
    setTimeNotificationAfterPause,
    setIsNotification,
    unsetNotificationTimer,
    setPlayStatus,
    setPlayerId,
    setTimerTrainingStatus,
  } = useCombineStates();

  // use for stopping and resuming timer and video when user switches in App
  const { setOnBlur } = useWatcher();

  // use when App goes to background and comes back to foreground
  useEffect(() => {
    if (!isNotification) {
      setupListener();
    } else {
      removeListener();
    }
  }, []);

  const setupListener = async () => {
    App.addListener("appStateChange", ({ isActive }) => {
      if (!isActive) {
        console.log("CLOSEEEE", timerMode);
        setPlayStatus(false);
        setPlayerId();
        setTimerTrainingStatus("pause");
      } else {
        const timerMode = useCombineStates.getState().timerMode;
        console.log("OPENNNNN", timerMode);
        if (timerMode !== "training") {
          setTimerTrainingStatus("start");
        }
      }
    });
  };

  // use for removing listener when Timer for Notification works
  const removeListener = async () => {
    await App.removeAllListeners();
  };
  //
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
          {isNotification ? (
            <IonGrid>
              <IonRow>
                <IonCol className="timer-page__content">
                  <TimerFace
                    size={280}
                    strokeWidth={22}
                    colors={["#ffc409", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[7, 5, 2, 0]}
                    timerFor={"notification"}
                    timerKey={timerNotificationKey}
                    timerInterval={timerNotificationInterval}
                    timerDuration={
                      timeNotificationAfterPause ? timeNotificationAfterPause : timeNotificationDuration - Date.now()
                    }
                    timerActive={timerNotificationStatus === "running"}
                    onComplete={unsetNotificationTimer}
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
                  <TimerResetButton
                    unsetTimer={() => {
                      setIsNotification(false);
                      unsetNotificationTimer();
                    }}
                    timerStatus={timerNotificationStatus}
                  />
                </IonCol>
              </IonRow>
            </IonGrid>
          ) : (
            <SwiperContainer />
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default TimerPage;
