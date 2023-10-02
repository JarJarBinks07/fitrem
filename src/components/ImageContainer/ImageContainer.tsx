import React from "react";
import { IonButton, IonCol, IonGrid, IonImg, IonItem, IonLabel, IonRow } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Swiper as SwiperInterface } from "swiper";
import { Pagination, A11y, Navigation } from "swiper/modules";
import { Capacitor } from "@capacitor/core";
import SwiperButtons from "./SwiperButtons";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./ImageContainer.css";

const ImageContainer: React.FC = () => {
  const platform = Capacitor.getPlatform();
  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol class="ion-no-padding">
            <p className="track__exercises">Biceps Curls</p>
            <div className="ion-text-uppercase">
              <p className="track__category">Track: Upper Body</p>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
      <Swiper
        modules={[Pagination, Navigation]}
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        // className="mySwiper"
      >
        <SwiperSlide>
          <IonImg src="/assets/icons/step_000.jpg" alt="img" />
        </SwiperSlide>
        <SwiperSlide>
          <IonImg src="/assets/icons/step_015.jpg" alt="img" />
        </SwiperSlide>
        <SwiperSlide>
          <IonImg src="/assets/icons/step_030.jpg" alt="img" />
        </SwiperSlide>
        <SwiperButtons />
        {/* {platform === "web" ? <SwiperButtons /> : null} */}
      </Swiper>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonButton expand="full">EXPLAIN</IonButton>
          </IonCol>
          <IonCol>
            <IonButton expand="full">MARK DOWN</IonButton>
          </IonCol>
          <IonCol>
            <IonButton expand="full">SKIP</IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default ImageContainer;
