import React, { useEffect, useState } from "react";
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
import { Swiper, SwiperSlide } from "swiper/react";
// import { Swiper as SwiperInterface } from "swiper";
import { Pagination, Navigation, EffectFade } from "swiper/modules";
import { Capacitor } from "@capacitor/core";
import SwiperButtons from "./SwiperButtons";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./SwiperContainer.css";
import ModalWindow from "../ModalWindow/ModalWindow";
import VideoPlayer from "../PlayerReact/VideoPlayerReact";

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

  /////////////////////////////////
  const [play, setPlay] = useState(false);
  const [mode, setMode] = useState("play");

  const changeStatus = () => {
    setPlay((prev) => !prev);
    setMode((prev) => (prev === "play" ? "pause" : "play"));
  };

  useEffect(() => {
    setTimeout(getVideoData, 1000);
  }, []);

  const [videoData, setVideoData] = useState<IVideo[]>([]);

  const getVideoData = async () => {
    try {
      const data = [
        {
          id: 0,
          video_path: "/assets/tracks/bicep/Bicep_01.mp4",
          image_path: "/assets/tracks/bicep/Bicep_01.jpg",
          category: "Biceps",
          exercise: "upper body #1",
          tools: false,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui. Eaque, dicta",
        },
        {
          id: 1,
          video_path: "/assets/tracks/bicep/Bicep_02.mp4",
          image_path: "/assets/tracks/bicep/Bicep_02.jpg",
          category: "Biceps",
          exercise: "upper body #2",
          tools: false,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui. Eaque, dicta",
        },
        {
          id: 2,
          video_path: "/assets/tracks/bicep/Bicep_03.mp4",
          image_path: "/assets/tracks/bicep/Bicep_03.jpg",
          category: "Biceps",
          exercise: "upper body #4",
          tools: false,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui. Eaque, dicta",
        },
        {
          id: 3,
          video_path: "/assets/tracks/bicep/Bicep_04.mp4",
          image_path: "/assets/tracks/bicep/Bicep_04.jpg",
          category: "Biceps",
          exercise: "upper body #4",
          tools: false,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui. Eaque, dicta",
        },
      ];

      setVideoData(data);
    } catch (error) {
      console.log("Error with receiving videoFetchData: ", error);
    }
  };

  return (
    <>
      <div className="swiper">
        {videoData.length > 0 ? (
          <Swiper
            modules={[Pagination, Navigation, EffectFade]}
            slidesPerView={1}
            loop={true}
            pagination={{
              clickable: true,
              type: "fraction",
            }}
            simulateTouch={false}
            touchRatio={1}
            speed={800}
            // effect="fade"
            // navigation={true}
            observer={true}
            observeParents={true}
            observeSlideChildren={true}
            className="mySwiper"
            onAny={() => {
              console.log("hello");
            }}
          >
            {/* //////////////////////////////////// */}

            {videoData.map((item) => (
              <SwiperSlide key={item.id}>
                <p className="track__exercises">{item.category}</p>
                <div className="ion-text-uppercase">
                  <p className="track__category">Track: {item.exercise}</p>
                </div>
                <VideoPlayer play={play} path={item.video_path} />
              </SwiperSlide>
            ))}

            {/* //////////////////////////////////// */}

            {/* {videoData.map((item) => (
            <SwiperSlide key={item.id}>
              <p className="track__exercises">{item.category}</p>
              <div className="ion-text-uppercase">
                <p className="track__category">Track: {item.exercise}</p>
              </div>
              <div>
                <IonImg src={item.image_path} alt="" className="swiper__image" />
              </div>
            </SwiperSlide>
          ))} */}

            {/* //////////////////////////////////// */}
            <SwiperButtons />
            {/* {platform === "web" ? <SwiperButtons /> : null} */}
          </Swiper>
        ) : (
          <IonItem>
            <IonSpinner name="bubbles"></IonSpinner>
          </IonItem>
        )}

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton expand="full" onClick={changeStatus}>
                <div className="ion-text-uppercase">{mode}</div>
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
      </div>
      {isOpen ? <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
    </>
  );
};

export default ImageContainer;
