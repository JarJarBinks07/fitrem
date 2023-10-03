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
import VideoPlayer from "../PlayerVideoJs/VideoPlayerJS";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalWindow({ isOpen, setIsOpen }: IProps) {
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    // responsive: true,
    loop: true,
    // muted: true,
    // videoWidth: 480,
    // videoHeight: 680,
    poster: "/assets/icons/step_000.jpg",
    // fluid: true,
    sources: [
      {
        src: "/assets/icons/Step_jacks_wo_bounce0030-0150.mp4",
        type: "video/mp4",
      },
    ],
  };

  // const [url, setUrl] = useState({
  //   temporary_url: "https://brenopolanski.github.io/html5-video-webvtt-example/MIB2.mp4",
  // });
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
              <IonTitle>Description</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {/* <IonImg src="/assets/icons/step_500x500.webp" alt="img"></IonImg> */}
            {/* <IonImg src="/assets/icons/step_1000x1000.webp" alt="img"></IonImg> */}
            <>
              <div>Exercises</div>
              <VideoPlayer options={videoJsOptions} />
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos
                reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui.
                Eaque, dicta.
              </div>
            </>

            {/* <VideoPlayer attachment={url} /> */}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}

export default ModalWindow;
