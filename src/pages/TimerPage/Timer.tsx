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
import axios from "axios";
import { Exercise, StateExercise } from "../../store/TracksState";
import { saveTrack } from "../../settings/capacitor.storage";

const TimerPage: React.FC = () => {
  // const { setExercises, exercises } = useCombineStates();
  // console.log(exercises[0].id);

  // const getData = async () => {
  //   const response = await fetch("http://192.168.0.153:3000/api/hello");
  //   const data: { exercise: Exercise[] } = await response.json();
  //   console.log(data);
  //   const modifiedExercises = await Promise.all(
  //     data.exercise.map(async (e) => {
  //       const video = await getBase64FromUrl(e.videoUrl);
  //       const image = await getBase64FromUrl(e.imageUrl);
  //       return { ...e, video, image };
  //     })
  //   );
  //   setExercises(modifiedExercises);
  // };
  // useEffect(() => {
  //   getData();
  // }, []);

  // const getBase64FromUrl = async (url: string) => {
  //   const response = await axios.request({
  //     url: url,
  //     method: "get",
  //     responseType: "arraybuffer",
  //   });

  //   return Buffer.from(response.data).toString("base64");
  // };

  const [status, setStatus] = useState(true);
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
      <ProfileMenu />
      <IonPage id="profile">
        <IonHeader>
          <IonToolbar color="warning">
            <IonButtons slot="primary">
              <IonMenuToggle>
                <IonButton className="timer__bar_btn">
                  <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
                </IonButton>
              </IonMenuToggle>
            </IonButtons>
            <IonTitle>Timer</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          {!status ? (
            <IonGrid>
              <IonRow>
                <IonCol>
                  <SwiperContainer />
                </IonCol>
              </IonRow>
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
          ) : (
            <SwiperContainer />
          )}
        </IonContent>
        {/* <FooterButtons /> */}
      </IonPage>
    </>
  );
};

export default TimerPage;
