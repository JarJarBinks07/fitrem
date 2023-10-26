import React, { useEffect, useRef, useState } from "react";
import { App } from "@capacitor/app";
import { IonButton, IonCol, IonGrid, IonIcon, IonImg, IonItem, IonRow, IonSpinner } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade } from "swiper/modules";
import { Capacitor } from "@capacitor/core";
import ModalWindowExercise from "../ModalWindows/ModalWindowExercise/ModalWindowExercise";
import VideoPlayer from "../PlayerReact/VideoPlayer";
import { useCombineStates } from "../../store/useCombineStates";
import ISwiper from "swiper";
import _ from "lodash";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./SwiperContainer.css";
import { optionsOutline } from "ionicons/icons";

import ModalWindowSettings from "../ModalWindows/ModalWindowSettings/ModalWindowSettings";
import TimersForTraining from "./components/TimersForTraining/TimersForTraining";
import SwiperUserButtons from "./components/SwiperUserButtons/SwiperUserButtons";
import SwiperTitle from "./components/SwiperTitle/SwiperTitle";
import SwiperInfoButton from "./SwiperInfoButton/SwiperInfoButton";
import SwiperNavigationButtons from "./components/SwiperNavigatonButtons/SwiperNavigationButtons";
import { useWatcher } from "../../shared/hooks/useWatcher";

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
    savedHistoryDoneExercises,
    preloadedImage,
    disabledNavigationButtons,
    timerNotificationInterval,
    timerTrainingInterval,
    timerRestInterval,
    setSwiperTrackIndex,
    setTimerTrainingStatus,
    setPlayStatus,
    setPlayerId,
    setTimerNotificationInterval,
    setTimerTrainingInterval,
    setTimerRestInterval,
    unsetWhenDone,
  } = useCombineStates();

  const { setOnBlur, setOnFocus } = useWatcher();

  /////Use when App reloads unexpectedly/////

  // useEffect(() => {
  //   unsetForPersist();
  // }, []);

  /////use for background and foreground modes/////

  useEffect(() => {
    setupListener();
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

  /////Use when App goes to background and comes back to foreground/////

  /////If one field checkbox and one track chosen we use useEffect (at least one must be chosen always). Init level/////
  // useEffect(() => {
  //   if (!userTraining.length) {
  //     generateUserTraining();
  //   }
  // }, []);

  ///// use for disabling navigation /////
  const groupedByDoneCategory = _.groupBy([...userTraining], "category");

  const isActiveNavigationButtons = Object.keys(groupedByDoneCategory).length > 1;

  /////use for displaying slides/////
  const slicedUserTraining = [...userTraining].slice(0, Object.keys(groupedByDoneCategory).length);

  /////ref for activation next slide/////
  const swiperRef = useRef<ISwiper>();

  /////use platform if we want to disabled buttons in Swiper for device/////
  const platform = Capacitor.getPlatform();

  /////ModalRender: value should be 0 when Swiper init/////

  const [isOpenModalExercise, setIsOpenModalExercise] = useState(false);
  const [isOpenModalSettings, setIsOpenModalSettings] = useState(false);

  /////use for applying changes in Modal Settings////

  const onSaveSettingsHandler = (notificationValue: number, trainingValue: number, restValue: number) => {
    setTimerNotificationInterval(notificationValue);
    setTimerTrainingInterval(trainingValue);
    setTimerRestInterval(restValue);
    unsetWhenDone();
    setOnFocus(setIsOpenModalSettings);
  };

  console.log("doneExercises: ", passedExercises);
  console.log("userTraining: ", userTraining);
  console.log("savedHistoryDoneExercises: ", savedHistoryDoneExercises);
  console.log("disabledNavigationButtons: ", disabledNavigationButtons);
  console.log("PlayStatus: ", playStatus);
  console.log("timerTrainingStatus:", timerTrainingStatus);
  console.log("timeTrainingDuration: ", timeTrainingDuration);
  console.log("timeTrainingAfterPause: ", timeTrainingAfterPause);
  console.log("timerMode: ", timerMode);

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
              <TimersForTraining swiper={swiperRef.current as ISwiper} setPlayStatus={setPlayStatus} />

              <Swiper
                className="swiper__content"
                modules={[Pagination, Navigation, EffectFade]}
                slidesPerView={1}
                loop={true}
                // navigation={true}
                pagination={{
                  clickable: false,
                  type: "fraction",
                }}
                simulateTouch={false}
                touchRatio={0}
                speed={1500}
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
                {isActiveNavigationButtons && disabledNavigationButtons ? (
                  <SwiperNavigationButtons swiper={swiperRef.current as ISwiper} />
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
    </div>
  );
};

export default ImageContainer;
