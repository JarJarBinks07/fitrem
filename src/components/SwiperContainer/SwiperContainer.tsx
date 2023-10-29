import React, { useEffect, useRef, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { App } from "@capacitor/app";
import { IonButton, IonIcon, IonImg } from "@ionic/react";
import { optionsOutline } from "ionicons/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import ISwiper from "swiper";
import { Pagination, Navigation, EffectFade } from "swiper/modules";
import VideoPlayer from "../PlayerReact/VideoPlayer";
import { useCombineStates } from "../../store/useCombineStates";
import { NativeAudio } from "@capacitor-community/native-audio";
import ModalWindowExercise from "../ModalWindows/ModalWindowExercise/ModalWindowExercise";
import ModalWindowSettings from "../ModalWindows/ModalWindowSettings/ModalWindowSettings";
import TimersForTraining from "./components/TimersForTraining/TimersForTraining";
import SwiperUserButtons from "./components/SwiperUserButtons/SwiperUserButtons";
import SwiperTitle from "./components/SwiperTitle/SwiperTitle";
import SwiperInfoButton from "./components/SwiperInfoButton/SwiperInfoButton";
import SwiperNavigationButtons from "./components/SwiperNavigatonButtons/SwiperNavigationButtons";
import { useWatcher } from "../../shared/hooks/useWatcher";
import _ from "lodash";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./SwiperContainer.css";
import SwiperAlert from "./components/SwiperAlert/SwiperAlert";
import ModalWindowsStatistic from "../ModalWindows/ModalWindowStatistic/ModalWindowStatistic";

interface IVideo {
  id: number;
  video_path: string;
  image_path: string;
  category: string;
  exercise: string;
  tools: boolean;
  description: string;
}

const ImageContainer: React.FC = () => {
  const {
    counterDoneExercises,
    timeTrainingDuration,
    timeTrainingAfterPause,
    timerTrainingStatus,
    timerMode,
    swiperTrackIndex,
    playStatus,
    playerId,
    userTraining,
    passedExercises,
    savedInHistoryDoneExercises,
    preloadedImage,
    disabledNavigationButtons,
    timerNotificationInterval,
    timerTrainingInterval,
    timerRestInterval,
    doneExercisesDuringSession,
    setSwiperTrackIndex,
    setTimerTrainingStatus,
    setPlayStatus,
    setPlayerId,
    setStartWorkout,
    setTimerNotificationInterval,
    setTimerTrainingInterval,
    setTimerRestInterval,
    setExercisesAfterTraining,
    setNotificationStatus,
    unsetWhenDone,
  } = useCombineStates();

  useEffect(() => {
    setupListener();
    preloadAudio();
  }, []);

  useEffect(() => {
    if (timerMode === "rest") {
      swiperRef?.current?.slideNext();
    }
    if (timerMode === "training") {
      setTimeout(() => {
        setDisabled(true);
      });
      setTimeout(() => {
        setDisabled(false);
      }, 3000);
    }
  }, [timerMode]);

  //  Use when App reloads unexpectedly

  // useEffect(() => {
  //   unsetForPersist();
  // }, []);

  // use for disabling Go message
  const [disabledGo, setDisabled] = useState(false);

  // use for stopping and resuming timer and video when user switches in App
  const { setOnBlur, setOnFocus } = useWatcher();

  // use for audio message
  const preloadAudio = async () => {
    NativeAudio.preload({
      assetId: "countdown",
      assetPath: "countdown.mp3",
      audioChannelNum: 1,
      isUrl: false,
    });
  };

  const playAudio = async () => {
    await NativeAudio.play({
      assetId: "countdown",
    });
  };

  // use when App goes to background and comes back to foreground
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

  // use for disabling navigation
  const groupedByDoneCategory = _.groupBy([...userTraining], "category");
  const activeCategoryLength = Object.keys(groupedByDoneCategory).length;

  // use for displaying slides
  const slicedUserTraining = [...userTraining].slice(0, Object.keys(groupedByDoneCategory).length);

  // ref for activation next slide
  const swiperRef = useRef<ISwiper>();

  // use platform if we want to disabled buttons in Swiper for device
  const platform = Capacitor.getPlatform();

  // ModalRender: value should be 0 when Swiper init

  const [isOpenModalExercise, setIsOpenModalExercise] = useState(false);
  const [isOpenModalSettings, setIsOpenModalSettings] = useState(false);
  const [isModalStatistic, setIsModalStatistic] = useState(false);
  const [isOpenSwiperAlert, setIsOpenSwiperAlert] = useState(false);
  // use for applying changes in Modal Settings
  const onSaveSettingsHandler = (notificationValue: number, trainingValue: number, restValue: number) => {
    setTimerNotificationInterval(notificationValue);
    setTimerTrainingInterval(trainingValue);
    setTimerRestInterval(restValue);
    unsetWhenDone();
    setOnFocus(setIsOpenModalSettings);
  };
  // use when training was passed
  const onCompleteAfterTraining = () => {
    setNotificationStatus(true);
    setIsModalStatistic(false);
    setExercisesAfterTraining();
    setStartWorkout(false);
  };

  console.log("counterDoneExercises", counterDoneExercises);
  console.log("userTraining: ", userTraining);
  console.log("passedExercises: ", passedExercises);
  console.log("doneExercisesDuringSession: ", doneExercisesDuringSession);
  console.log("savedInHistoryDoneExercises: ", savedInHistoryDoneExercises);
  // // console.log("savedHistorySkippedExercises: ", savedHistorySkippedExercises);
  // console.log("disabledNavigationButtons: ", disabledNavigationButtons);
  // console.log("PlayStatus: ", playStatus);
  // console.log("timerTrainingStatus:", timerTrainingStatus);
  // console.log("timeTrainingDuration: ", timeTrainingDuration);
  // console.log("timeTrainingAfterPause: ", timeTrainingAfterPause);
  // console.log("timerMode: ", timerMode);

  return (
    <div className="swiper">
      {slicedUserTraining.length ? (
        <>
          <IonButton
            className="swiper__btn_settings"
            onClick={() => {
              setOnBlur(setIsOpenModalSettings);
              // playAudio();
            }}
          >
            <IonIcon slot="icon-only" icon={optionsOutline}></IonIcon>
          </IonButton>

          <div>
            {slicedUserTraining.map((item, index) =>
              swiperTrackIndex === index ? (
                <div key={item.id}>
                  <SwiperTitle category={item.category} exercise={item.exercise} />
                </div>
              ) : null
            )}
            <div className="swiper__container">
              <SwiperInfoButton setOnBlur={setOnBlur} setIsOpen={setIsOpenModalExercise} />
              <TimersForTraining
                swiper={swiperRef.current as ISwiper}
                playAudio={playAudio}
                setPlayStatus={setPlayStatus}
                setIsOpenSwiperAlert={setIsOpenSwiperAlert}
              />
              {timerMode === "training" && disabledGo ? <div className="swiper__message">GO</div> : null}
              {timerMode === "rest" ? <div className="swiper__message">REST</div> : null}

              <Swiper
                className="swiper__content"
                modules={[Pagination, Navigation, EffectFade]}
                loop={false}
                // navigation={true}
                pagination={{
                  clickable: false,
                  type: "fraction",
                }}
                simulateTouch={false}
                touchRatio={0}
                speed={1200}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onRealIndexChange={(swiper) => {
                  setSwiperTrackIndex(swiper.realIndex);
                }}
              >
                {slicedUserTraining.map((item, index) => (
                  // <div className="swiper__slide">
                  <SwiperSlide key={item.id}>
                    <VideoPlayer id={playerId} play={playStatus} path={item.video_path} />
                  </SwiperSlide>
                  // </div>
                ))}
                {activeCategoryLength > 1 && disabledNavigationButtons ? (
                  <SwiperNavigationButtons
                    swiper={swiperRef.current as ISwiper}
                    swiperTrackIndex={swiperTrackIndex}
                    activeCategoryLength={activeCategoryLength}
                  />
                ) : null}
              </Swiper>
            </div>
          </div>
        </>
      ) : (
        <div className="swiper__preload">
          <div className="swiper__preload_video">
            <IonImg src={preloadedImage} alt="" />
            {/* <VideoPlayer play={false} path={preloadedImage.image_path} /> */}
          </div>
        </div>
      )}

      <SwiperUserButtons swiper={swiperRef.current as ISwiper} />
      <IonButton expand="full" onClick={setExercisesAfterTraining}>
        TEST
      </IonButton>
      {slicedUserTraining[swiperTrackIndex] ? (
        <ModalWindowExercise
          isOpen={isOpenModalExercise}
          setOnFocus={setOnFocus}
          setIsOpen={setIsOpenModalExercise}
          path={slicedUserTraining[swiperTrackIndex].video_path}
          description={slicedUserTraining[swiperTrackIndex].description}
        />
      ) : null}
      <ModalWindowSettings
        isOpen={isOpenModalSettings}
        timerNotificationInterval={timerNotificationInterval}
        timerTrainingInterval={timerTrainingInterval}
        timerRestInterval={timerRestInterval}
        onSaveHandler={onSaveSettingsHandler}
      />
      <ModalWindowsStatistic
        isOpen={isModalStatistic}
        doneExercisesDuringSession={doneExercisesDuringSession}
        onComplete={onCompleteAfterTraining}
      />
      <SwiperAlert isOpen={isOpenSwiperAlert} setIsOpen={setIsOpenSwiperAlert} setIsModalStatistic={setIsModalStatistic} />
    </div>
  );
};

export default ImageContainer;
