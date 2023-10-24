import React, { useEffect, useRef, useState } from "react";
import { App } from "@capacitor/app";
import { IonButton, IonCol, IonGrid, IonIcon, IonImg, IonItem, IonRow, IonSpinner } from "@ionic/react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
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
import CachedImage from "../CachedImage/CachedImage";

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
    timerDurationForTraining,
    timeAfterPauseForTraining,
    timerStatusForTraining,
    timerMode,
    // playMode,
    playStatus,
    userTraining,
    passedExercises,
    savedHistoryDoneExercises,
    preloadedImage,
    disabledNavButtonsWhenTrainingStarts,
    disabledMainButtonsExceptTraining,
    setTimerStatusForTraining,
    setPlayStatus,
    // setChangedModeWithStatus,
    unsetForPersist,
  } = useCombineStates();

  // const [test, setTest] = useState(false);

  /////Use when App reloads unexpectedly/////

  // useEffect(() => {
  //   unsetForPersist();
  // }, []);

  const [test, setTest] = useState(true);

  useEffect(() => {
    // setTest(playStatus);
  }, []);

  useEffect(() => {
    setupListener();
  }, []);

  const setupListener = async () => {
    App.addListener("appStateChange", ({ isActive }) => {
      if (!isActive) {
        console.log("CLOSEEEEEEE");
        setPlayStatus(false);
        setTimerStatusForTraining("pause");
      } else {
        // if (!playStatus) {
        console.log("OPENNNNN");
        setPlayStatus(false);
        // setTimerStatusForTraining("start");
        // if (timerMode !== "training") {
        // setTimerStatusForTraining("start");
        // }
        // }
      }
    });

    // App.addListener('backButton', (data) => {
    //   console.log('back button click:', JSON.stringify(data));
    //   if (data.canGoBack) {
    //     window.history.back();
    //   } else {
    //     // Можливо, відображення сповіщення перед закриттям додатку?
    //     App.exitApp();
    //   }
    // });
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

  /////Use platform if we want to disabled buttons in Swiper for device/////
  const platform = Capacitor.getPlatform();

  //////ModalRender: value should be 0 when Swiper init/////

  const [swiperTrackIndex, setSwiperTrackIndex] = useState(0);
  const [isOpenModalExercise, setIsOpenModalExercise] = useState(false);
  const [isOpenModalSettings, setIsOpenModalSettings] = useState(false);

  console.log("doneExercises: ", passedExercises);
  console.log("userTraining: ", userTraining);
  console.log("savedHistoryDoneExercises: ", savedHistoryDoneExercises);
  console.log("disabledNavButtonsWhenTrainingStarts: ", disabledNavButtonsWhenTrainingStarts);
  console.log("PlayStatus: ", playStatus);
  // console.log("PlayMode: ", playMode);
  console.log("timerStatusForTraining:", timerStatusForTraining);
  console.log("timerDurationForTraining: ", timerDurationForTraining);
  console.log("timeAfterPauseForTraining: ", timeAfterPauseForTraining);

  return (
    <div className="swiper">
      {slicedUserTraining.length ? (
        <>
          <IonButton
            className="swiper__btn_settings"
            onClick={() => {
              playStatus
                ? (setPlayStatus(false), setIsOpenModalSettings(true), setTimerStatusForTraining("pause"))
                : setIsOpenModalSettings(true);
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
              <SwiperInfoButton
                playStatus={playStatus}
                setPlayStatus={setPlayStatus}
                setIsOpenModalExercise={setIsOpenModalExercise}
                setTimerStatusForTraining={setTimerStatusForTraining}
              />
              <TimersForTraining
                swiper={swiperRef.current as ISwiper}
                setPlayStatus={setPlayStatus}
                swiperTrackIndex={swiperTrackIndex}
              />

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
                speed={1000}
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
                    <VideoPlayer play={playStatus && test ? true : false} path={item.video_path} />
                  </SwiperSlide>
                  // </div>
                ))}
                {isActiveNavigationButtons && disabledNavButtonsWhenTrainingStarts ? (
                  <SwiperNavigationButtons swiper={swiperRef.current as ISwiper} />
                ) : null}
              </Swiper>
            </div>
          </div>
        </>
      ) : (
        <div className="swiper__preload">
          <div className="swiper__preload_video">
            {/* <IonImg src="/assets/tracks/bicep/Bicep_01.jpg" alt="" /> */}
            <VideoPlayer play={false} path={preloadedImage.image_path} />
          </div>
        </div>
      )}

      <SwiperUserButtons swiper={swiperRef.current as ISwiper} swiperTrackIndex={swiperTrackIndex} />
      {slicedUserTraining[swiperTrackIndex] ? (
        <ModalWindowExercise
          timerFor={"working"}
          isOpen={isOpenModalExercise}
          setIsOpen={setIsOpenModalExercise}
          path={slicedUserTraining[swiperTrackIndex].video_path}
          description={slicedUserTraining[swiperTrackIndex].description}
          disabledMainButtonsExceptTraining={disabledMainButtonsExceptTraining}
          setTimerStatusForTraining={setTimerStatusForTraining}
        />
      ) : null}
      <ModalWindowSettings isOpen={isOpenModalSettings} setIsOpen={setIsOpenModalSettings} />
    </div>
  );
};

export default ImageContainer;
