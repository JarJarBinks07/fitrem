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
import { useLocation } from "react-router";
import GuideForSkipTimerSettings from "../../components/TourGuide/components/GuideForSkipTimerSettings";
import GuideForStartButton from "../../components/TourGuide/components/GuideForStartButton";
import GuideForTabTracksButton from "../../components/TourGuide/components/GuideForTabTracksButton";

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
    firstConnection,
    counterBeacons,
    setCounterBeacons,
    showGuideForTabTracksButton,
    setGuideForTabTracksButton,
    showGuideForSkipTimerSettings,
    setGuideForSkipTimerSettings,
    showGuideForStartButton,
    setGuideForStartButton,
  } = useCombineStates();

  console.log("COUNTER", counterBeacons);

  // use for showing correctly tour guide. We also can use path in dependency
  const location = useLocation();
  const path = location.pathname.slice(1);

  // use because JoyRide loses focus on element
  useEffect(() => {
    // for tracks button
    if (counterBeacons === 0) {
      setGuideForTabTracksButton(false);
      setTimeout(() => {
        setGuideForTabTracksButton(true);
      });
    }
    // for skip-time-settings
    if (counterBeacons === 9) {
      setGuideForSkipTimerSettings(false);
      setTimeout(() => {
        setGuideForSkipTimerSettings(true);
      });
    }
    // for start workout
    if (counterBeacons === 12) {
      setGuideForStartButton(false);
      setTimeout(() => {
        setGuideForStartButton(true);
      });
    }
  }, [path, counterBeacons]);
  // use for stopping and resuming timer and video when user switches in App
  const { setOnBlur } = useWatcher();

  // use when App goes to background and comes back to foreground
  useEffect(() => {
    isNotification ? removeListener() : setupListener();
  }, [isNotification]);

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

  // use when notification done
  const onCompleteNotification = () => {
    setIsNotification(false);
    unsetNotificationTimer();
  };

  return (
    <>
      <ProfileMenu />
      <IonPage>
        <IonHeader>
          <IonToolbar color="warning">
            <IonButtons slot="primary">
              <IonMenuToggle>
                <IonButton id="profile" className="timer-page__profile_btn" onClick={() => setOnBlur()}>
                  <IonIcon id="profile-btn" slot="icon-only" icon={personCircle}></IonIcon>
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
                    onComplete={onCompleteNotification}
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
                  <TimerResetButton unsetTimer={onCompleteNotification} timerStatus={timerNotificationStatus} />
                </IonCol>
              </IonRow>
            </IonGrid>
          ) : (
            <SwiperContainer />
          )}
        </IonContent>
      </IonPage>
      {path === "timer" ? (
        <>
          <GuideForTabTracksButton
            showBeacon={showGuideForTabTracksButton}
            setShowGuide={setGuideForTabTracksButton}
            setCounterBeacons={setCounterBeacons}
          />

          <GuideForSkipTimerSettings
            showBeacon={showGuideForSkipTimerSettings}
            setShowGuide={setGuideForSkipTimerSettings}
            setCounterBeacons={setCounterBeacons}
          />

          <GuideForStartButton
            showBeacon={showGuideForStartButton}
            setShowGuide={setGuideForStartButton}
            setCounterBeacons={setCounterBeacons}
          />
        </>
      ) : null}
    </>
  );
};

export default TimerPage;
