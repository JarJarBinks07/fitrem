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
  IonToggle,
} from "@ionic/react";

import "./ModalWindowTracks.css";
import { exercisesData } from "../../../shared/tracks/tracks";
import ModalWindowExercise from "../ModalWindowExercise/ModalWindowExercise";
import { useCombineStates } from "../../../store/useCombineStates";
import CashedImage from "../../CachedImage/CachedImage";

interface IProps {
  category: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  unsetWhenDone: () => void;
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
  const {
    allExercises,
    selectedExercisesByID,
    counterBeacons,
    userTraining,
    setSelectedExercisesByID,
    generateUserTraining,
    unsetWhenDone,
    setCounterBeacons,
  } = useCombineStates();

  const [openNewWindow, setOpenNewWindow] = useState(false);
  const [exerciseID, setExerciseID] = useState<number | null>(null);

  const handlerExercise = (id: number | null) => {
    setExerciseID(id);
    setOpenNewWindow(true);
  };
  const filteredData = allExercises?.filter((item) => item.category.toLowerCase() === category.toLowerCase());
  const [currentExercise] = filteredData.filter((item) => item.id === exerciseID);

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{category}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              className="tracks__modal_btn"
              onClick={() => {
                setIsOpen(false);
                if (counterBeacons === 6 && userTraining.length) {
                  setCounterBeacons();
                }
              }}
            >
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          {filteredData?.map((item) => (
            <IonRow style={{ margin: "5px" }} key={item.id}>
              <IonCol size="10">
                <IonItem className="track__item" onClick={() => handlerExercise(item.id)}>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <CashedImage path={item.image_path} />
                      </IonCol>
                      <IonCol>
                        <IonTitle>{item.exercise}</IonTitle>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonToggle
                  aria-label="Warning toggle"
                  color="warning"
                  style={{ marginTop: "5vh" }}
                  checked={selectedExercisesByID.includes(item.id)}
                  onIonChange={() => {
                    setSelectedExercisesByID(item.id);
                    unsetWhenDone();
                    generateUserTraining();
                  }}
                ></IonToggle>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
      <ModalWindowExercise
        isOpen={openNewWindow}
        setIsOpen={setOpenNewWindow}
        description={currentExercise?.description}
        path={currentExercise?.video_path}
      />
    </IonModal>
  );
}

export default ModalWindowTracks;
