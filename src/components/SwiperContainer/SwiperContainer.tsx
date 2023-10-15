import React, { useEffect, useState } from "react";
import { IonButton, IonCol, IonGrid, IonItem, IonRow, IonSpinner } from "@ionic/react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import SwiperInterface from "swiper";
import { Pagination, Navigation, EffectFade } from "swiper/modules";
import { Capacitor } from "@capacitor/core";
import SwiperButtons from "./SwiperButtons";
import ModalWindow from "../ModalWindow/ModalWindow";
import VideoPlayer from "../PlayerReact/VideoPlayer";
import { exercisesData } from "../../shared/tracks/tracks";
import { useCombineStates } from "../../store/useCombineStates";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./SwiperContainer.css";

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
    userTraining,
    generateUserTraining,
    selectedCategoryTracks,
    doneExercises,
    setDoneExercises,
    savedHistoryExercises,
  } = useCombineStates();
  const slicedUserTraining = [...userTraining].slice(0, selectedCategoryTracks.length);

  /////use platform if we want to disabled buttons in Swiper for device/////
  const platform = Capacitor.getPlatform();

  //////ModalRender: value should be 0 when Swiper init/////
  const [swiperTrackIndex, setSwiperTrackIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

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
  return (
    <div className="swiper">
      {slicedUserTraining.length ? (
        <>
          {slicedUserTraining.map((item, index) =>
            swiperTrackIndex === index ? (
              <div key={item.id}>
                <p className="track__exercises">{item.category}</p>
                <div className="ion-text-uppercase">
                  <p className="track__category">Track: {item.exercise}</p>
                </div>
              </div>
            ) : null
          )}
          <Swiper
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
            className="mySwiper"
            // onInit={(swiper) => {
            //   setSwiperTrackIndex(swiper.realIndex);
            // }}
            onRealIndexChange={(swiper) => {
              setSwiperTrackIndex(swiper.realIndex);
            }}
          >
            {slicedUserTraining.map((item, index) => (
              <SwiperSlide key={item.id}>
                <VideoPlayer play={swiperTrackIndex === index ? playStatus : false} path={item.video_path} />
              </SwiperSlide>
            ))}
            <SwiperButtons />

            {/* {platform === "web" ? <SwiperButtons /> : null} */}
          </Swiper>
        </>
      ) : null}

      <IonGrid>
        <IonRow>
          <IonCol>
            <IonButton expand="full" onClick={changeStatus}>
              <div className="ion-text-uppercase">{playMode}</div>
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton expand="full" onClick={() => setIsOpen(true)}>
              <div className="ion-text-uppercase">Explain</div>
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton disabled={false} expand="full" onClick={() => setDoneExercises(swiperTrackIndex, "skipped")}>
              <div className="ion-text-uppercase">Skip</div>
            </IonButton>
          </IonCol>
        </IonRow>
        <IonButton expand="full" style={{ marginTop: 10 }} onClick={() => setDoneExercises(swiperTrackIndex, "done")}>
          Test
        </IonButton>
      </IonGrid>
      {slicedUserTraining[swiperTrackIndex] ? (
        <ModalWindow
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          path={slicedUserTraining[swiperTrackIndex].video_path}
          description={slicedUserTraining[swiperTrackIndex].description}
        />
      ) : null}
    </div>
  );
};

export default ImageContainer;
