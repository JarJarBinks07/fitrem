import React from "react";
import ISwiper from "swiper";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { checkmarkCircleOutline } from "ionicons/icons";
import CachedImage from "../../CachedImage/CachedImage";
import { IExercise } from "../../../store/TracksState";

import "./ModalWindowStatistic.css";
import { useCombineStates } from "../../../store/useCombineStates";

interface IProps {
  isOpen: boolean;
  swiper: ISwiper;
  passedExercises: IExercise[];
  onComplete: (swiper: ISwiper) => void;
  setModalStatistic: (value: boolean) => void;
}

const ModalWindowsStatistic: React.FC<IProps> = ({ swiper, isOpen, passedExercises, onComplete, setModalStatistic }) => {
  const { stepsForBeacons: counterBeacons, setStepsForBeacons: setCounterBeacons } = useCombineStates();
  return (
    <IonModal className="modal-statistic" isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Statistic</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                if (counterBeacons === 14) {
                  setCounterBeacons();
                }
                setModalStatistic(false);
                onComplete(swiper);
              }}
            >
              Done
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid className="modal-statistic__grid">
          {passedExercises.map((e) => (
            <IonRow key={e.id} className="modal-statistic__row">
              <IonCol className="modal-statistic__col">
                <CachedImage path={e.image_path}></CachedImage>
              </IonCol>
              <IonCol className="modal-statistic__col   statistic__label" size="6">
                <IonLabel>{e.exercise}</IonLabel>
              </IonCol>
              <IonCol className="modal-statistic__col">
                <div>
                  <IonIcon
                    className="modal-statistic__icon"
                    color="success"
                    slot="end"
                    icon={checkmarkCircleOutline}
                    size="large"
                  ></IonIcon>
                </div>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default ModalWindowsStatistic;
