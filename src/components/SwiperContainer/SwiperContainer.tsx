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
  const platform = Capacitor.getPlatform();
  const [isOpen, setIsOpen] = useState(false);

  ///////ModalRender////////////
  const [trackIndex, setTrackIndex] = useState(0);
  /////////////////////////////////
  const [playStatus, setPlayStatus] = useState(false);
  const [playMode, setPlayMode] = useState("play");

  const changeStatus = () => {
    setPlayStatus((prev) => !prev);
    setPlayMode((prev) => (prev === "play" ? "pause" : "play"));
  };
  const {
    selectedTracks: selectedCategories,
    userTraining,
    allExercises,
    selectedExercises,
    generateUserTraining,
  } = useCombineStates();
  useEffect(() => {
    if (!userTraining.length) {
      generateUserTraining();
    }
  }, []);
  return (
    <div className="swiper">
      {userTraining.length ? (
        <>
          {userTraining.map((item, index) =>
            trackIndex === index ? (
              <div key={item.id}>
                <p className="track__exercises">{item.category}</p>
                <div className="ion-text-uppercase">
                  <p className="track__category">Track: {item.exercise}</p>
                </div>
              </div>
            ) : (
              []
            )
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
            onRealIndexChange={(swiper) => setTrackIndex(swiper.realIndex)}
            // onSlideChange={(swiper) => console.log(swiper.realIndex)}
          >
            {userTraining.map((item, index) => (
              <SwiperSlide key={item.id}>
                <VideoPlayer play={trackIndex === index ? playStatus : false} path={item.video_path} />
              </SwiperSlide>
            ))}
            <SwiperButtons />

            {/* {platform === "web" ? <SwiperButtons /> : null} */}
          </Swiper>
        </>
      ) : (
        <IonItem>{/* <IonSpinner name="bubbles"></IonSpinner> */}</IonItem>
      )}

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
            <IonButton disabled={true} expand="full">
              <div className="ion-text-uppercase">Done</div>
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
      {trackIndex ? (
        <ModalWindow
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          path={userTraining[trackIndex].video_path}
          description={userTraining[trackIndex].description}
        />
      ) : null}
    </div>
  );
};

export default ImageContainer;
