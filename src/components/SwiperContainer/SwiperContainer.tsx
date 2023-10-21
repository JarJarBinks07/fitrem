import React, { useEffect, useRef, useState } from "react";
import { IonButton, IonIcon, IonItem, IonRow, IonSpinner } from "@ionic/react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, Navigation, EffectFade } from "swiper/modules";
import { Capacitor } from "@capacitor/core";
import ModalWindow from "../ModalWindows/ModalWindowExercise/ModalWindowExercise";
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
  const { userTraining, generateUserTraining, passedExercises, savedHistoryDoneExercises, preloadedImage } =
    useCombineStates();

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

  /////Initial state/////
  const [disabledButtons, setDisabledButtons] = useState(false);

  /////Use platform if we want to disabled buttons in Swiper for device/////
  const platform = Capacitor.getPlatform();

  //////ModalRender: value should be 0 when Swiper init/////

  const [swiperTrackIndex, setSwiperTrackIndex] = useState(0);
  const [isOpenModalExercise, setIsOpenModalExercise] = useState(false);
  const [isOpenModalSettings, setIsOpenModalSettings] = useState(false);

  console.log("doneExercises", passedExercises);
  console.log("userTraining", userTraining);
  console.log("savedHistoryDoneExercises", savedHistoryDoneExercises);

  /////Video player/////
  const [playStatus, setPlayStatus] = useState(false);
  const [playMode, setPlayMode] = useState<"play" | "pause">("play");
  const changeStatus = () => {
    setPlayStatus((prev) => !prev);
    setPlayMode((prev) => (prev === "play" ? "pause" : "play"));
  };

  return (
    <div className="swiper">
      {slicedUserTraining.length ? (
        <>
          <IonButton className="swiper__btn_settings" onClick={() => setIsOpenModalSettings(true)}>
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
                changeStatus={changeStatus}
                setIsOpenModalExercise={setIsOpenModalExercise}
              />

              <TimersForTraining
                selectedTimer={"training"}
                swiper={swiperRef.current as ISwiper}
                changeStatus={changeStatus}
                setDisabledButtons={setDisabledButtons}
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
                  <SwiperSlide key={item.id}>
                    <VideoPlayer play={swiperTrackIndex === index ? playStatus : false} path={item.video_path} />
                  </SwiperSlide>
                ))}
                {isActiveNavigationButtons ? <SwiperNavigationButtons swiper={swiperRef.current as ISwiper} /> : null}
              </Swiper>
            </div>
          </div>
        </>
      ) : (
        <div className="swiper__container">
          <VideoPlayer play={false} path={preloadedImage.image_path} />
        </div>
      )}

      <SwiperUserButtons
        swiper={swiperRef.current as ISwiper}
        swiperTrackIndex={swiperTrackIndex}
        playStatus={playStatus}
        playMode={playMode}
        disabledButtons={disabledButtons}
        changeStatus={changeStatus}
        setDisabledButtons={setDisabledButtons}
        setPlayMode={setPlayMode}
        setPlayStatus={setPlayStatus}
      />
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
