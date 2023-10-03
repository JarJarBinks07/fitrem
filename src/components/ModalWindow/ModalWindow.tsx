import React, { useState } from "react";
import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, IonPage } from "@ionic/react";
import VideoPlayer from "../Player/VideoPlayer";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalWindow({ isOpen, setIsOpen }: IProps) {
  const [url, setUrl] = useState({
    temporary_url: "https://brenopolanski.github.io/html5-video-webvtt-example/MIB2.mp4",
  });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inline Modal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Explanation</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <VideoPlayer attachment={url} />
            {/* <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos
              reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui.
              Eaque, dicta.
            </p> */}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}

export default ModalWindow;
