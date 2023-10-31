import React, { useEffect, useState } from "react";
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
    isOpenSwiperAlert,
    timeTrainingDuration,
    timeTrainingAfterPause,
    timerTrainingStatus,
    timerMode,
    swiperTrackIndex,
    playStatus,
    playerId,
    userTraining,
    passedExercisesDuringSession,
    savedInHistoryDoneExercises,
    preloadedImage,
    disabledNavigationButtons,
    timerNotificationInterval,
    timerTrainingInterval,
    timerRestInterval,
    setSwiperTrackIndex,
    setTimerTrainingStatus,
    setPlayStatus,
    setStartWorkout,
    setTimerNotificationInterval,
    setTimerTrainingInterval,
    setTimerRestInterval,
    setExercisesAfterTraining,
    setIsNotification,
    setDisabledNavigationButtons,
    setTimeTrainingDuration,
    setTimerMode,
    setIsOpenSwiperAlert,
    setDoneExercise,
    unsetWhenDone,
    unsetForPersist,
    unsetTrainingTimer,
    unsetNotificationTimer,
  } = useCombineStates();

  //  use when App reloads unexpectedly
  useEffect(() => {
    unsetForPersist();
  }, []);

  //use for auto swiping when exercise was done. Be careful also works when you manually click on DONE
  useEffect(() => {
    if (timerMode === "rest") {
      swiper?.slideNext();
    }
  }, [timerMode]);

  const [swiper, setSwiper] = useState<ISwiper>();

  // use for disabling GG message
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

  // use platform if we want to disabled buttons in Swiper for device
  const platform = Capacitor.getPlatform();

  // modal windows
  const [isOpenModalExercise, setIsOpenModalExercise] = useState(false);
  const [isOpenModalSettings, setIsOpenModalSettings] = useState(false);
  const [isModalStatistic, setIsModalStatistic] = useState(false);

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
    swiper?.slideTo(0, 1000);
    setStartWorkout(false);
    setDisabledNavigationButtons(true);
    setExercisesAfterTraining();
    unsetNotificationTimer();
  };

  //use after done exercise for reductive logic in TimersForTraining and SwiperUserButtons
  const counterActiveTracks = Object.keys(_.groupBy(userTraining, "category")).length;

  const executorDoneExercise = () => {
    if (swiperTrackIndex === counterActiveTracks - 1) {
      setTimerTrainingStatus("pause");
      setSettings(timerTrainingInterval, "training", false);
      setIsOpenSwiperAlert(true);
      setDoneExercise(swiperTrackIndex);
      unsetWhenDone();
      return;
    }
    setDoneExercise(swiperTrackIndex);
    setSettings(timerRestInterval, "rest", false);
    unsetTrainingTimer();
    setTimerTrainingStatus("start");
  };

  // console.log("swiper", swiper);
  console.log("userTraining: ", userTraining);
  console.log("passedExercisesDuringSession: ", passedExercisesDuringSession);
  console.log("savedInHistoryDoneExercises: ", savedInHistoryDoneExercises);
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
                playAudio={playAudio}
                setDisabledGO={setDisabledGO}
                setSettings={setSettings}
                executorDoneExercise={executorDoneExercise}
              />
              {timerMode === "training" && disabledGO ? <div className="swiper__message">GO</div> : null}
              {timerMode === "rest" ? <div className="swiper__message">REST</div> : null}

              <Swiper
                className="swiper__content"
                initialSlide={swiperTrackIndex}
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

      <SwiperUserButtons
        swiper={swiper as ISwiper}
        setSettings={setSettings}
        counterActiveTracks={counterActiveTracks}
        executorDoneExercise={executorDoneExercise}
      />
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
        passedExercises={passedExercisesDuringSession}
        onComplete={onCompleteAfterTraining}
      />
      <SwiperAlert
        isOpen={isOpenSwiperAlert}
        setIsOpen={setIsOpenSwiperAlert}
        setIsModalStatistic={setIsModalStatistic}
        setSwiperTrackIndex={setSwiperTrackIndex}
      />
    </div>
  );
};

export default ImageContainer;
