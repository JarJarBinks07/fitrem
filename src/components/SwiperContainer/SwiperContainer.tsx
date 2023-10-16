import React, { useEffect, useState } from "react";
import { IonButton, IonCol, IonGrid, IonIcon, IonItem, IonRow, IonSpinner } from "@ionic/react";
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
import { alertCircleOutline, caretBack, caretForward, ellipsisHorizontal, ellipsisVertical } from "ionicons/icons";

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
  const swiper = useSwiper();

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
    <div className="test">
      {slicedUserTraining.length ? (
        <div>
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
          <div className="swiper__container">
            <IonButton
              className="swiper__info_btn"
              onClick={() => {
                setIsOpen(true);
                {
                  playStatus ? changeStatus() : null;
                }
              }}
            >
              <IonIcon slot="icon-only" icon={alertCircleOutline} size="large"></IonIcon>
            </IonButton>
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
              <SwiperButtons />

              {/* {platform === "web" ? <SwiperButtons /> : null} */}
            </Swiper>
          </div>
        </div>
      ) : null}

      <IonGrid>
        <IonRow>
          <IonCol>
            <IonButton expand="full" onClick={changeStatus}>
              <div className="ion-text-uppercase">{playMode}</div>
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
