import React from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonImg,
} from "@ionic/react";
// import VideoPlayer from "../PlayerCapacitor/VideoPlayer";
import VideoPlayer from "../PlayerVideoJs/VideoPlayer";
import VideoPlayerReact from "../PlayerReact/VideoPlayer";

interface IProps {
  path: string;
  description: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalWindow({ path, description, isOpen, setIsOpen }: IProps) {
  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Description</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div>{description}</div>
        <VideoPlayerReact play={true} path={path} />

        {/* <VideoPlayer attachment={url} /> */}
      </IonContent>
    </IonModal>
  );
}

export default ModalWindow;
