import React, { useEffect, useState } from "react";
import { register } from "swiper/element/bundle";
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
    register();
    setTimeout(getVideoData, 1000);
  }, []);

  const [videoData, setVideoData] = useState<IVideo[]>([]);

  const getVideoData = async () => {
    try {
      const data = [
        {
          id: 111,
          video_path: "/assets/tracks/bicep/Bicep_01.mp4",
          image_path: "/assets/tracks/bicep/Bicep_01.jpg",
          category: "Biceps",
          exercise: "upper body #1",
          tools: false,
          description:
            "111_Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui. Eaque, dicta",
        },
        {
          id: 222,
          video_path: "/assets/tracks/bicep/Bicep_02.mp4",
          image_path: "/assets/tracks/bicep/Bicep_02.jpg",
          category: "Biceps",
          exercise: "upper body #2",
          tools: false,
          description:
            "222_Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui. Eaque, dicta",
        },
        {
          id: 333,
          video_path: "/assets/tracks/bicep/Bicep_03.mp4",
          image_path: "/assets/tracks/bicep/Bicep_03.jpg",
          category: "Biceps",
          exercise: "upper body #4",
          tools: false,
          description:
            "333_Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui. Eaque, dicta",
        },
        {
          id: 444,
          video_path: "/assets/tracks/bicep/Bicep_04.mp4",
          image_path: "/assets/tracks/bicep/Bicep_04.jpg",
          category: "Biceps",
          exercise: "upper body #4",
          tools: false,
          description:
            "444_Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui. Eaque, dicta",
        },
      ];

      setVideoData(data);
    } catch (error) {
      console.log("Error with receiving videoFetchData: ", error);
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
            // observer={true}
            // observeParents={true}
            // observeSlideChildren={true}
            className="mySwiper"
            // onSwiper={(swiper) => console.log(swiper.realIndex)}
            // onBeforeTransitionStart={(swiper) => console.log(swiper.realIndex)}
            onRealIndexChange={(swiper) => setGetTrackIndex(swiper.realIndex)}
            // onSlideChange={(swiper) => console.log(swiper.realIndex)}
          >
            {/* //////////////////////////////////// */}

            {videoData.map((item) => (
              <SwiperSlide key={item.id}>
                <p>{item.id}</p>
                <p className="track__exercises">{item.category}</p>

                <div className="ion-text-uppercase">
                  <p className="track__category">Track: {item.exercise}</p>
                </div>
                <SwiperButtons />
                <VideoPlayer play={playStatus} path={item.video_path} />
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
            {/* <SwiperButtons /> */}

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
        <ModalWindow
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          path={videoData[getTrackIndex].video_path}
          description={videoData[getTrackIndex].description}
        />
      </div>
    </>
  );
};

export default ImageContainer;
