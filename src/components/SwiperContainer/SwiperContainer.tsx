import React, { useEffect, useState } from "react";
import { IonButton, IonCol, IonGrid, IonItem, IonRow, IonSpinner } from "@ionic/react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import SwiperInterface from "swiper";
import { Pagination, Navigation, EffectFade } from "swiper/modules";
import { Capacitor } from "@capacitor/core";
import SwiperButtons from "./SwiperButtons";
import ModalWindow from "../ModalWindow/ModalWindow";
import VideoPlayer from "../PlayerReact/VideoPlayer";
import { dataTracks } from "../../shared/tracks/tracks";
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
  const [getTrackIndex, setGetTrackIndex] = useState(0);
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
  const { selectedCategories, count } = useCombineStates();
  const [videoData, setVideoData] = useState<IVideo[]>([]);

  const arrIncludesCurrentCategory = videoData?.filter((e) => selectedCategories.includes(e.category));
  ////////////////FilterforExerciseses Option#1////////////////////////////////
  // const groupedData = {};
  // arrIncludesCurrentCategory.forEach((item) => {
  //   if (!groupedData[item.category]) {
  //     groupedData[item.category] = [];
  //   }
  //   groupedData[item.category].push(item);
  // });

  // // Функція для чергування елементів з різних категорій
  // const interleaveCategories = (groupedData) => {
  //   const result = [];
  //   let maxGroupLength = 0;

  //   // Знаходимо найбільшу кількість елементів в одній з груп
  //   Object.values(groupedData).forEach((group) => {
  //     if (group.length > maxGroupLength) {
  //       maxGroupLength = group.length;
  //     }
  //   });

  //   // Додаємо по одному елементу з кожної групи в результат
  //   for (let i = 0; i < maxGroupLength; i++) {
  //     Object.values(groupedData).forEach((group) => {
  //       if (i < group.length) {
  //         result.push(group[i]);
  //       }
  //     });
  //   }

  //   return result;
  // };

  // // Викликаємо функцію для чергування
  // const interleavedData = interleaveCategories(groupedData);

  // console.log(interleavedData);

  ////////////////FilterforExerciseses Option#2///////

  // const [exerciseOneByOne, setExerciseOneByOne] = useState<IVideo[] | null>(null);

  const bicepsData = arrIncludesCurrentCategory?.filter((item) => item.category === "Biceps");
  const jumpsData = arrIncludesCurrentCategory?.filter((item) => item.category === "Jumps");
  const stepsData = arrIncludesCurrentCategory?.filter((item) => item.category === "Steps");

  const interleavedData: any = [];
  const slicedinterleavedData = [...interleavedData].slice(0, count);
  const maxLength = Math.max(bicepsData.length, jumpsData.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < bicepsData.length) {
      interleavedData.push(bicepsData[i]);
    }
    if (i < jumpsData.length) {
      interleavedData.push(jumpsData[i]);
    }
    if (i < stepsData.length) {
      interleavedData.push(stepsData[i]);
    }
  }
  console.log("Count: ", count, "Data: ", interleavedData);

  ////////////////////////////////////////////////
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

  return (
    <>
      <div className="swiper">
        {interleavedData.length ? (
          <>
            {interleavedData.map((item, index) =>
              getTrackIndex === index ? (
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
              // effect="fade"
              // navigation={true}
              className="mySwiper"
              // onSwiper={(swiper) => console.log(swiper.realIndex)}
              // onBeforeTransitionStart={(swiper) => console.log(swiper.realIndex)}
              onRealIndexChange={(swiper) => setGetTrackIndex(swiper.realIndex)}
              // onSlideChange={(swiper) => console.log(swiper.realIndex)}
            >
              {interleavedData.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <VideoPlayer play={getTrackIndex === index ? playStatus : false} path={item.video_path} />
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
        {interleavedData.length ? (
          <ModalWindow
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            path={interleavedData[getTrackIndex].video_path}
            description={interleavedData[getTrackIndex].description}
          />
        ) : null}
      </div>
    </>
  );
};

export default ImageContainer;
