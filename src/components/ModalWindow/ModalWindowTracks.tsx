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

import "./ModalWindowTracks.css";
import { exercisesData } from "../../shared/tracks/tracks";
import ModalWindow from "./ModalWindow";
import { useCombineStates } from "../../store/useCombineStates";
import CashedImage from "../CachedImage/CachedImage";

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
  const { exercises } = useCombineStates();

  const [openNewWindow, setOpenNewWindow] = useState(false);
  const [exerciseID, setExerciseID] = useState<number | null>(null);

  const handlerExercise = (id: number | null) => {
    setExerciseID(id);
    setOpenNewWindow(true);
  };
  const filteredData = exercises?.filter((item) => item.category.toLowerCase() === category.toLowerCase());
  const [currentExercise] = filteredData.filter((item) => item.id === exerciseID);

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
                        <CashedImage path={item.image_path} />
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
      <ModalWindow
        isOpen={openNewWindow}
        setIsOpen={setOpenNewWindow}
        description={currentExercise?.description}
        path={currentExercise?.video_path}
      />
    </IonModal>
  );
}

export default ModalWindowTracks;
