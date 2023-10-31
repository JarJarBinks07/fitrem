import React from "react";
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

interface IProps {
  isOpen: boolean;
  doneExercisesDuringSession: IExercise[];
  onComplete: () => void;
}

const ModalWindowsStatistic: React.FC<IProps> = ({ isOpen, doneExercisesDuringSession, onComplete }) => {
  return (
    <IonModal className="modal-statistic" isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Statistic</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onComplete}>Done</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid className="modal-statistic__grid">
          {doneExercisesDuringSession.map((e) => (
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
