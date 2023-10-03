import React, { useState } from "react";
import { IonButton, IonCol, IonGrid, IonImg, IonRow } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Swiper as SwiperInterface } from "swiper";
import { Pagination, A11y, Navigation, EffectFade, EffectFlip, EffectCube } from "swiper/modules";
import { Capacitor } from "@capacitor/core";
import SwiperButtons from "./SwiperButtons";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import "swiper/css/effect-cube";
import "./SwiperContainer.css";
import ModalWindow from "../ModalWindow/ModalWindow";
import VideoPlayer from "../PlayerCapacitor/VideoPlayer";

const ImageContainer: React.FC = () => {
  const platform = Capacitor.getPlatform();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div>
        {/* <IonGrid>
          <IonRow>
            <IonCol class="ion-no-padding">
              <p className="track__exercises">Biceps Curls</p>
              <div className="ion-text-uppercase">
                <p className="track__category">Track: Upper Body</p>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid> */}
        <Swiper
          modules={[Pagination, Navigation, EffectCube, EffectFade, EffectFlip]}
          // spaceBetween={10}
          slidesPerView={1}
          loop={true}
          pagination={{
            clickable: true,
          }}
          simulateTouch={false}
          touchRatio={1}
          speed={900}
          // cubeEffect={{
          //   shadow: true,
          //   slideShadows: true,
          //   shadowOffset: 20,
          //   shadowScale: 0.94,
          // }}
          // effect={"cube"}
          // effect="fade"
          // effect={"flip"}
          // navigation={true}
          observer={true}
          observeParents={true}
          observeSlideChildren={true}
          className="mySwiper"
        >
          <SwiperSlide>
            <p className="track__exercises">Biceps Curls#1</p>
            <div className="ion-text-uppercase">
              <p className="track__category">Track: Upper Body#1</p>
            </div>
            <IonImg src="/assets/icons/step_000.jpg" alt="img" className="swiper__image" />
          </SwiperSlide>
          <SwiperSlide>
            <p className="track__exercises">Biceps Curls#2</p>
            <div className="ion-text-uppercase">
              <p className="track__category">Track: Upper Body#2</p>
            </div>
            <IonImg src="/assets/icons/step_015.jpg" alt="img" className="swiper__image" />
          </SwiperSlide>
          <SwiperSlide>
            <p className="track__exercises">Biceps Curls#3</p>
            <div className="ion-text-uppercase">
              <p className="track__category">Track: Upper Body#3</p>
            </div>
            <IonImg src="/assets/icons/step_030.jpg" alt="img" className="swiper__image" />
          </SwiperSlide>
          <SwiperButtons />
          {/* {platform === "web" ? <SwiperButtons /> : null} */}
        </Swiper>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton expand="full" onClick={() => setIsOpen(true)}>
                EXPLAIN
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="full">MARK DOWN</IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="full">SKIP</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
      {isOpen ? <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
    </>
  );
};

export default ImageContainer;
