import React, { useEffect, useState } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonCheckbox,
  IonCol,
  IonGrid,
  IonRow,
  IonThumbnail,
} from "@ionic/react";
import VideoPlayerReact from "../PlayerReact/VideoPlayer";

import "./ModalWindowTracks.css";
import { dataTracks } from "../../shared/tracks/tracks";
import ModalWindow from "./ModalWindow";

interface IProps {
  category: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IVideo {
  id: number;
  video_path: string;
  image_path: string;
  category: string;
  exercise: string;
  tools: boolean;
  description: string;
}

function ModalWindowTracks({ isOpen, setIsOpen, category }: IProps) {
  const [openNewWindow, setOpenNewWindow] = useState(false);
  const [videoData, setVideoData] = useState<IVideo[]>([]);
  const [exerciseID, setExerciseID] = useState<number | null>(null);

  const handlerExercise = (id: number | null) => {
    setExerciseID(id);
    setOpenNewWindow(true);
  };

  useEffect(() => {
    getVideoData();
  }, []);

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

  const filteredData = videoData.filter((item) => item.category.toLowerCase() === category.toLowerCase());

  const currentExercise = filteredData.filter((item) => item.id === exerciseID);

  // console.log(currentExercise);

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{category}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          {filteredData?.map((item) => (
            <IonRow>
              <IonCol>
                <IonItem className="track__item" onClick={() => handlerExercise(item.id)}>
                  <IonGrid>
                    <IonRow>
                      <IonCol size="5">
                        <IonThumbnail className="tracks__thumbnail">
                          <img src={item.image_path} alt="" />
                        </IonThumbnail>
                      </IonCol>
                      <IonCol>
                        <IonTitle>{item.exercise}</IonTitle>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonItem>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
      {currentExercise?.map((item) => (
        <ModalWindow
          isOpen={openNewWindow}
          setIsOpen={setOpenNewWindow}
          description={item.description}
          path={item.video_path}
        />
      ))}
    </IonModal>
  );
}

export default ModalWindowTracks;
