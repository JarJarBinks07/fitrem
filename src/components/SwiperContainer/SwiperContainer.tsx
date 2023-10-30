import React, { useEffect, useRef, useState } from "react";
import { Capacitor } from "@capacitor/core";
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
    setIsNotification,
    setDisabledNavigationButtons,
    setTimeTrainingDuration,
    setTimerMode,
    unsetWhenDone,
    unsetForPersist,
    unsetNotificationTimer,
  } = useCombineStates();

  //use for auto swiping when exercise was done
  useEffect(() => {
    if (timerMode === "rest") {
      swiper?.slideNext();
    }
  }, [timerMode]);

  //  Use when App reloads unexpectedly

  useEffect(() => {
    unsetForPersist();
  }, []);

  // use for disabling Go message
  const [disabledGO, setDisabledGO] = useState(false);

  // use for stopping and resuming timer and video when user switches in App
  const { setOnBlur, setOnFocus } = useWatcher();

  // use in TimersForTraining and SwiperUserButtons
  const setSettings = (interval: number, mode: "preparation" | "training" | "rest", status: boolean) => {
    setTimeTrainingDuration(interval * 1000);
    setTimerMode(mode);
    setPlayStatus(status);
  };

  // use for audio message
  const playAudio = async () => {
    await NativeAudio.play({
      assetId: "countdown",
    });
  };

  // use for disabling navigation
  const groupedByDoneCategory = _.groupBy([...userTraining], "category");
  const activeCategoryLength = Object.keys(groupedByDoneCategory).length;

  // use for displaying slides
  const slicedUserTraining = [...userTraining].slice(0, Object.keys(groupedByDoneCategory).length);

  // ref for activation next slide
  const [swiper, setSwiper] = useState<ISwiper>();

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
    setOnFocus(setIsOpenModalSettings);
    unsetWhenDone();
    unsetNotificationTimer();
  };

  // use when training was passed
  const onCompleteAfterTraining = () => {
    setIsNotification(true);
    setIsModalStatistic(false);
    setExercisesAfterTraining();
    swiper?.slideTo(0, 1000);
    setStartWorkout(false);
    setDisabledNavigationButtons(true);
    unsetNotificationTimer();
  };

  console.log("swiper", swiper);
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
                swiper={swiper as ISwiper}
                playAudio={playAudio}
                setPlayStatus={setPlayStatus}
                setDisabledGO={setDisabledGO}
                setSettings={setSettings}
                setIsOpenSwiperAlert={setIsOpenSwiperAlert}
              />
              {timerMode === "training" && disabledGO ? <div className="swiper__message">GO</div> : null}
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
                  setSwiper(swiper);
                  console.log("onSwiper", swiper);
                }}
                onRealIndexChange={(swiper) => {
                  console.log("onRealIndexChange", swiper);
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
                    swiper={swiper as ISwiper}
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

      <SwiperUserButtons swiper={swiper as ISwiper} setIsOpenSwiperAlert={setIsOpenSwiperAlert} setSettings={setSettings} />
      {/* <IonButton
        expand="full"
        onClick={() => {
          setExercisesAfterTraining();

          swiper?.slideTo(0, 1000);
        }}
      >
        TEST
      </IonButton> */}
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
