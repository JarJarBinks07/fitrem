import React, { useEffect, useRef, useState } from "react";
import { IonButton, IonCol, IonGrid, IonIcon, IonItem, IonRow, IonSpinner } from "@ionic/react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, Navigation, EffectFade } from "swiper/modules";
import { Capacitor } from "@capacitor/core";
import SwiperButtons from "./SwiperButtons";
import ModalWindow from "../ModalWindows/ModalWindowExercise/ModalWindowExercise";
import VideoPlayer from "../PlayerReact/VideoPlayer";
import { useCombineStates } from "../../store/useCombineStates";
import ISwiper from "swiper";

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
import TimersForTraining from "./components/TimersForTraining";

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
    setTimeAfterPauseForTraining,
    timerDurationForTraining,
    workIntervalForTraining,
    timerKeyForTraining,
    timeAfterPauseForTraining,
    timerStatusForTraining,
    unsetTimerForTraining,
    userTraining,
    generateUserTraining,
    selectedCategoryTracks,
    doneExercises,
    setDoneExercises,
    savedHistoryExercises,
    countDownForTraining,
    restIntervalForTraining,
    savedRestIntervalForTraining,
    unsetWhenDone,
    setSelectedExercisesByID,
  } = useCombineStates();

  /////ref for call next slide/////
  const swiperRef = useRef<ISwiper>();

  const slicedUserTraining = [...userTraining].slice(0, selectedCategoryTracks.length);
  const [nextSlide, setNextSlide] = useState(false);

  /////Initial state/////
  const [workoutButton, setWorkoutButton] = useState(true);
  const [disabledButtons, setDisabledButtons] = useState(false);

  /////Use platform if we want to disabled buttons in Swiper for device/////
  const platform = Capacitor.getPlatform();

  //////ModalRender: value should be 0 when Swiper init/////

  const [swiperTrackIndex, setSwiperTrackIndex] = useState(0);
  const [isOpenModalExercise, setIsOpenModalExercise] = useState(false);
  const [isOpenModalSettings, setIsOpenModalSettings] = useState(false);
  const [swiperButtons, setSwiperButtons] = useState(true);

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

  const pauseButtonHandler = () => {
    setTimerStatusForTraining("pause");
    setTimeAfterPauseForTraining();
    changeStatus();
  };

  const playButtonHandler = () => {
    if (timeAfterPauseForTraining) {
      setTimerDurationForTraining(timeAfterPauseForTraining);
    } else {
      /////value must be in milliseconds/////
      setTimerDurationForTraining(workIntervalForTraining * 1000);
    }
    setTimerStatusForTraining("running");
    changeStatus();
  };

  /////If one field checkbox and one track chosen we use useEffect (at least one must be chosen always). Init level/////
  useEffect(() => {
    if (!userTraining.length) {
      generateUserTraining();
    }
  }, []);

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
              <TimersForTraining
                selectedTimer={"training"}
                swiper={swiperRef.current as ISwiper}
                changeStatus={changeStatus}
                setDisabledButtons={setDisabledButtons}
              />
              {
                // <TimerFace
                //   timerKey={timerKeyForTraining}
                //   timerInterval={countDownForTraining || workIntervalForTraining || restIntervalForTraining || 0}
                //   timerDuration={
                //     timeAfterPauseForTraining ? timeAfterPauseForTraining : timerDurationForTraining - Date.now()
                //   }
                //   timerActive={timerStatusForTraining === "running"}
                //   unsetTimer={unsetTimerForTraining}
                //   size={65}
                //   strokeWidth={4}
                //   colors={
                //     countDownForTraining
                //       ? ["#ffc409", "#ffc409"]
                //       : workIntervalForTraining
                //       ? ["#eb445a", "#eb445a"]
                //       : restIntervalForTraining
                //       ? ["#2fc22d", "#2dc275"]
                //       : ["#ffc409", "#ffc409"]
                //   }
                //   colorsTime={[15, 10]}
                //   mode={"training"}
                //   swiper={swiperRef.current as ISwiper}
                //   // swiper={swiperInstance}
                //   changeStatus={changeStatus}
                //   setDisabledButtons={setDisabledButtons}
                // />
              }
            </div>

            <Swiper
              modules={[Pagination, Navigation, EffectFade]}
              slidesPerView={1}
              loop={true}
              // navigation={true}
              pagination={{
                clickable: true,
                type: "fraction",
              }}
              simulateTouch={false}
              touchRatio={0}
              speed={1500}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              // onSwiper={(swiper) => setSwiperInstance(swiper)}
              onRealIndexChange={(swiper) => {
                setSwiperTrackIndex(swiper.realIndex);
              }}
              className="swiper__content"
            >
              {
                // selectedCategoryTracks.length && setSelectedExercisesByID.length ?
                // (
                slicedUserTraining.map((item, index) => (
                  <SwiperSlide key={item.id}>
                    <VideoPlayer play={swiperTrackIndex === index ? playStatus : false} path={item.video_path} />
                  </SwiperSlide>
                ))
                // ) : (
                //   <VideoPlayer play={false} path={"/assets/icons/test.mp4"} />
                // )
              }
              {/* {selectedCategoryTracks.length > 1 && } */}
              {swiperButtons ? <SwiperButtons swiper={swiperRef.current as ISwiper} /> : null}

              {/* {platform === "web" ? <SwiperButtons /> : null} */}
            </Swiper>
          </div>
        </div>
      ) : null}

      <IonGrid className="swiper__grid_container">
        <IonRow className="swiper__grid_row">
          {workoutButton ? (
            <IonCol>
              <IonButton
                className="swiper__bar_btn"
                expand="block"
                onClick={() => {
                  setWorkoutButton(false);
                  setSwiperButtons(false);
                  setDisabledButtons(true);
                  setTimerStatusForTraining("running");
                }}
              >
                <div className="ion-text-uppercase">Start Workout</div>
              </IonButton>
            </IonCol>
          ) : (
            <>
              <IonCol>
                <IonButton
                  disabled={disabledButtons}
                  className="swiper__bar_btn"
                  expand="block"
                  onClick={timerStatusForTraining === "running" ? pauseButtonHandler : playButtonHandler}
                >
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
                  disabled={disabledButtons}
                  className="swiper__bar_btn  swiper__bar_btn_done"
                  expand="block"
                  onClick={() => {
                    swiperRef.current?.slideNext();

                    setDoneExercises(swiperTrackIndex, "done");

                    setPlayMode("play");
                    setPlayStatus(false);
                    setTimerStatusForTraining("pause");
                    unsetWhenDone();
                  }}
                >
                  <IonIcon className="swiper__bar_icon" slot="end" icon={checkmarkCircleOutline}></IonIcon>
                  {/* <IonIcon className="swiper__bar_icon" slot="end" icon={checkmarkOutline}></IonIcon> */}

                  <div className="ion-text-uppercase">Done</div>
                </IonButton>
              </IonCol>
            </>
          )}
          <IonCol>
            <IonButton
              disabled={disabledButtons}
              className="swiper__bar_btn"
              expand="block"
              onClick={() => {
                unsetWhenDone();
                setDoneExercises(swiperTrackIndex, "skipped");
              }}
            >
              {/* <IonIcon className="swiper__bar_icon" slot="end" icon={playForwardCircleOutline}></IonIcon> */}
              {/* <IonIcon className="swiper__bar_icon" slot="end" icon={playForward}></IonIcon> */}
              <IonIcon className="swiper__bar_icon" slot="end" icon={reloadCircleOutline}></IonIcon>

              <div className="ion-text-uppercase">Skip</div>
            </IonButton>
          </IonCol>
        </IonRow>
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
