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
import TourGuide from "../../components/TourGuide/TourGuide";
import RewardCard from "../../components/Cards/RewardCard";

const TimerPage: React.FC = () => {
  const {
    timerMode,
    isNotification,
    timerNotificationInterval,
    timerNotificationStatus,
    timerNotificationKey,
    timeNotificationDuration,
    timeNotificationAfterPause,
    setPlayerId,
    setPlayStatus,
    setIsNotification,
    setIsOpenProfileMenu,
    setTimerTrainingStatus,
    setTimerNotificationStatus,
    setTimeNotificationDuration,
    setTimeNotificationAfterPause,
    unsetNotificationTimer,

    stepsForBeacons,
  } = useCombineStates();

  //test for rewards
  const [isReward, setIsReward] = useState(true);

  // use for tour guide
  const location = useLocation();
  const path = location.pathname.slice(1);

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
      <IonPage id="profile">
        <IonHeader>
          <IonToolbar color="warning">
            <IonButtons slot="primary">
              <IonMenuToggle>
                <IonButton
                  className="timer-page__profile_btn"
                  onClick={() => {
                    setOnBlur();
                    setIsOpenProfileMenu(true);
                  }}
                >
                  <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
                </IonButton>
              </IonMenuToggle>
            </IonButtons>
            <IonTitle className="timer-page__title">Timer</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="timer-page__content">
          <>
            {isNotification ? (
              <IonGrid id="notification">
                <IonRow>
                  <IonCol className="timer-page__col">
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
            {/* {isReward && <RewardCard />} */}
          </>
        </IonContent>
      </IonPage>
      {path === "timer" ? <TourGuide path={path} /> : null}
    </>
  );
};

export default TimerPage;
