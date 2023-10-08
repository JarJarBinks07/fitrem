import React, { useEffect, useState } from "react";
// import { register } from "swiper/element/bundle";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonImg,
  IonItem,
  IonLabel,
  IonLoading,
  IonRow,
  IonSpinner,
  IonTitle,
} from "@ionic/react";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import SwiperInterface from "swiper";
import { Pagination, Navigation, EffectFade } from "swiper/modules";
import { Capacitor } from "@capacitor/core";
import SwiperButtons from "./SwiperButtons";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./SwiperContainer.css";
import ModalWindow from "../ModalWindow/ModalWindow";
import VideoPlayer from "../PlayerReact/VideoPlayer";
import { dataTracks } from "../../shared/tracks/tracks";

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
  const [getTrackIndex, setGetTrackIndex] = useState(0);
  console.log(getTrackIndex);

  /////////////////////////////////
  const [playStatus, setPlayStatus] = useState(false);
  const [playMode, setPlayMode] = useState("play");

  const changeStatus = () => {
    setPlayStatus((prev) => !prev);
    setPlayMode((prev) => (prev === "play" ? "pause" : "play"));
  };

  useEffect(() => {
    getVideoData();
  }, []);

  const [videoData, setVideoData] = useState<IVideo[]>([]);

  const getVideoData = async () => {
    try {
      const data = await new Promise<IVideo[]>((resolve) => {
        resolve(dataTracks);
      });
      setVideoData(data);
    } catch (error) {
      console.log("Error with receiving VideoData: ", error);
    }
  };
  ///////////////SWIPER METHODS/////////////////
  const swiper = useSwiper();
  // const [swiper, setswiper] = useState<SwiperInterface>();
  // swiper?.slideTo(0);

  return (
    <>
      <div className="swiper">
        {videoData.length > 0 ? (
          <>
            {videoData.map((item, index) =>
              getTrackIndex === index ? (
                <>
                  <p className="track__exercises">{item.category}</p>
                  <div className="ion-text-uppercase">
                    <p className="track__category">Track: {item.exercise}</p>
                  </div>
                </>
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
              // effect="fade"
              // navigation={true}
              className="mySwiper"
              // onSwiper={(swiper) => console.log(swiper.realIndex)}
              // onBeforeTransitionStart={(swiper) => console.log(swiper.realIndex)}
              onRealIndexChange={(swiper) => setGetTrackIndex(swiper.realIndex)}
              // onSlideChange={(swiper) => console.log(swiper.realIndex)}
            >
              {/* //////////////////////////////////// */}

              {videoData.map((item, index) => (
                <SwiperSlide key={item.id}>
                  {/* <p>{item.id}</p>
                <p className="track__exercises">{item.category}</p>

                <div className="ion-text-uppercase">
                  <p className="track__category">Track: {item.exercise}</p>
                </div> */}

                  <VideoPlayer
                    play={getTrackIndex === index ? playStatus : false}
                    path={item.video_path}
                    // src={item.image_path}
                  />
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
        {videoData.length > 0 ? (
          <ModalWindow
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            path={videoData[getTrackIndex].video_path}
            description={videoData[getTrackIndex].description}
          />
        ) : null}
      </div>
    </>
  );
};

export default ImageContainer;
