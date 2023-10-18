import React, { useEffect, useState } from "react";
import { IonButton, IonCol, IonGrid, IonIcon, IonItem, IonRow, IonSpinner } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade } from "swiper/modules";
import { Capacitor } from "@capacitor/core";
import SwiperButtons from "./SwiperButtons";
import ModalWindow from "../ModalWindows/ModalWindowExercise/ModalWindowExercise";
import VideoPlayer from "../PlayerReact/VideoPlayer";
import { useCombineStates } from "../../store/useCombineStates";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./SwiperContainer.css";
import {
  alertCircleOutline,
  caretBack,
  caretForward,
  checkmarkCircleOutline,
  checkmarkOutline,
  ellipsisHorizontal,
  ellipsisVertical,
  informationCircleOutline,
  optionsOutline,
  pauseCircle,
  pauseCircleOutline,
  pauseCircleSharp,
  pauseOutline,
  pauseSharp,
  playCircleOutline,
  playForward,
  playForwardCircleOutline,
  playOutline,
  playSharp,
  reloadCircleOutline,
  thumbsUpOutline,
} from "ionicons/icons";
import TimerFace from "../../pages/TimerPage/components/TimerFace";
import TimerPlayButton from "../../pages/TimerPage/components/TimerPlayButton";
import ModalWindowSettings from "../ModalWindows/ModalWindowSettings/ModalWindowSettings";

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
    setTimerDurationForTraining,
    setTimerStatusForTraining,
    setTimerPauseForTraining,
    timerDurationForTraining,
    workIntervalForTraining,
    timerKeyForTraining,
    timerPauseForTraining,
    timerStatusForTraining,
    unsetTimerForTraining,
    userTraining,
    generateUserTraining,
    selectedCategoryTracks,
    doneExercises,
    setDoneExercises,
    savedHistoryExercises,
  } = useCombineStates();

  const slicedUserTraining = [...userTraining].slice(0, selectedCategoryTracks.length);

  const [nextSlide, setNextSlide] = useState(false);

  /////use platform if we want to disabled buttons in Swiper for device/////
  const platform = Capacitor.getPlatform();

  //////ModalRender: value should be 0 when Swiper init/////
  const [swiperTrackIndex, setSwiperTrackIndex] = useState(0);
  const [isOpenModalExercise, setIsOpenModalExercise] = useState(false);
  const [isOpenModalSettings, setIsOpenModalSettings] = useState(false);

  console.log("doneExercises", doneExercises);
  console.log("userTraining", userTraining);
  console.log("savedHistoryExercises", savedHistoryExercises);

  /////Video player/////
  const [playStatus, setPlayStatus] = useState(false);
  const [playMode, setPlayMode] = useState("play");

  const changeStatus = () => {
    setPlayStatus((prev) => !prev);
    setPlayMode((prev) => (prev === "play" ? "pause" : "play"));
  };

  /////If one field checkbox and one track chosen we use useEffect (at least one must be chosen always). Init level/////
  useEffect(() => {
    if (!userTraining.length) {
      generateUserTraining();
    }
  }, []);

  const pauseButtonHandler = () => {
    setTimerStatusForTraining("pause");
    setTimerPauseForTraining();
  };

  const playButtonHandler = () => {
    if (timerPauseForTraining) {
      //get timerPausedTime in milliseconds
      setTimerDurationForTraining(timerPauseForTraining);
    } else {
      //get timerInterval in seconds
      setTimerDurationForTraining(workIntervalForTraining);
    }
    setTimerStatusForTraining("running");
  };

  return (
    <div className="swiper">
      <IonButton className="swiper__btn_settings" onClick={() => setIsOpenModalSettings(true)}>
        <IonIcon slot="icon-only" icon={optionsOutline}></IonIcon>
      </IonButton>
      {slicedUserTraining.length ? (
        <div>
          {slicedUserTraining.map((item, index) =>
            swiperTrackIndex === index ? (
              <div key={item.id}>
                <p className="swiper__track_exercise">{item.category}</p>
                <div className="ion-text-uppercase">
                  <p className="swiper__track_category">Track: {item.exercise}</p>
                </div>
              </div>
            ) : null
          )}
          <div className="swiper__container">
            <IonButton
              className="swiper__btn_info"
              onClick={() => {
                setIsOpenModalExercise(true);
                {
                  playStatus ? changeStatus() : null;
                }
              }}
            >
              <IonIcon className="swiper__icon_info" slot="icon-only" icon={informationCircleOutline}></IonIcon>
            </IonButton>
            <div className="swiper__timer">
              <TimerFace
                timerKey={timerKeyForTraining}
                timerInterval={workIntervalForTraining}
                timerDuration={timerPauseForTraining ? Date.now() + timerPauseForTraining : timerDurationForTraining}
                timerActive={timerStatusForTraining === "running"}
                unsetTimer={unsetTimerForTraining}
                size={65}
                strokeWidth={4}
                colors={["#2fc22d", "#2dc275"]}
                colorsTime={[15, 10]}
                mode={"training"}
              />
            </div>

            <Swiper
              allowSlideNext={true}
              allowSlidePrev={true}
              modules={[Pagination, Navigation, EffectFade]}
              slidesPerView={1}
              loop={true}
              pagination={{
                clickable: true,
                type: "fraction",
              }}
              simulateTouch={false}
              touchRatio={0}
              speed={800}
              onRealIndexChange={(swiper) => {
                setSwiperTrackIndex(swiper.realIndex);
              }}
              className="swiper__content"
            >
              {slicedUserTraining.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <VideoPlayer play={swiperTrackIndex === index ? playStatus : false} path={item.video_path} />
                </SwiperSlide>
              ))}
              {/* {selectedCategoryTracks.length > 1 && } */}
              <SwiperButtons nextSlide={nextSlide} setNextSlide={setNextSlide} />

              {/* {platform === "web" ? <SwiperButtons /> : null} */}
            </Swiper>
          </div>
        </div>
      ) : null}

      <IonGrid className="swiper__grid_container">
        <IonRow className="swiper__grid_row">
          <IonCol>
            <IonButton className="swiper__bar_btn" expand="block" onClick={changeStatus}>
              <IonIcon
                className="swiper__bar_icon"
                slot="end"
                icon={playStatus ? pauseCircleOutline : playCircleOutline}
                // icon={playStatus ? pauseOutline : playSharp}
              ></IonIcon>
              <div className="ion-text-uppercase">{playMode}</div>
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton
              className="swiper__bar_btn  swiper__bar_btn_done"
              expand="block"
              onClick={() => setNextSlide(true)}
            >
              <IonIcon className="swiper__bar_icon" slot="end" icon={checkmarkCircleOutline}></IonIcon>
              {/* <IonIcon className="swiper__bar_icon" slot="end" icon={checkmarkOutline}></IonIcon> */}

              <div className="ion-text-uppercase">Done</div>
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton
              className="swiper__bar_btn"
              expand="block"
              onClick={() => setDoneExercises(swiperTrackIndex, "skipped")}
            >
              {/* <IonIcon className="swiper__bar_icon" slot="end" icon={playForwardCircleOutline}></IonIcon> */}
              {/* <IonIcon className="swiper__bar_icon" slot="end" icon={playForward}></IonIcon> */}
              <IonIcon className="swiper__bar_icon" slot="end" icon={reloadCircleOutline}></IonIcon>

              <div className="ion-text-uppercase">Skip</div>
            </IonButton>
          </IonCol>
        </IonRow>

        <IonButton
          className="swiper__bar_btn"
          expand="full"
          style={{ marginTop: 10 }}
          onClick={() => setDoneExercises(swiperTrackIndex, "done")}
        >
          Test
        </IonButton>
        <TimerPlayButton
          timerHandler={timerStatusForTraining === "running" ? pauseButtonHandler : playButtonHandler}
          timerStatus={timerStatusForTraining}
        />
      </IonGrid>
      {slicedUserTraining[swiperTrackIndex] ? (
        <ModalWindow
          isOpen={isOpenModalExercise}
          setIsOpen={setIsOpenModalExercise}
          path={slicedUserTraining[swiperTrackIndex].video_path}
          description={slicedUserTraining[swiperTrackIndex].description}
        />
      ) : null}
      <ModalWindowSettings isOpen={isOpenModalSettings} setIsOpen={setIsOpenModalSettings} />
    </div>
  );
};

export default ImageContainer;
