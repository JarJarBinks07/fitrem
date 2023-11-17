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
  IonCol,
  IonGrid,
  IonRow,
  IonToggle,
} from "@ionic/react";

import "./ModalWindowTracks.css";
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

const ModalWindowTracks: React.FC<IProps> = ({ isOpen, setIsOpen, category }) => {
  //use for selection all exercises
  const [selectAll, setSelectAll] = useState(false);

  const {
    allExercises,
    selectedExercisesByID,
    stepsForBeacons,
    userTraining,
    setSelectedExercisesByID,
    setSelectedAllExercise,
    generateUserTraining,
    unsetWhenDone,
    setStepsForBeacons,
  } = useCombineStates();

  console.log("selectedExercisesByID", selectedExercisesByID);

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
          <IonButtons slot="start">
            <IonButton
              className="tracks__modal_btn"
              onClick={() => {
                setSelectedAllExercise(category);
                unsetWhenDone();
                generateUserTraining();
              }}
            >
              Select all
            </IonButton>
          </IonButtons>
          <IonTitle>{category}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              className="tracks__modal_btn"
              onClick={() => {
                setIsOpen(false);
                if (stepsForBeacons === 6 && userTraining.length) {
                  setStepsForBeacons();
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
};

export default ModalWindowTracks;
