import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import CachedImage from "../../CachedImage/CachedImage";
import { IExercise } from "../../../store/TracksState";

import "./ModalWindowStatistic.css";
import { checkmarkCircleOutline } from "ionicons/icons";

interface IProps {
  isOpen: boolean;
  doneExercisesDuringSession: IExercise[];
  setNotificationStatus: (value: boolean) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalWindowsStatistic({ isOpen, doneExercisesDuringSession, setIsOpen, setNotificationStatus }: IProps) {
  return (
    <IonModal className="modal-statistic" isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Statistic</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                setNotificationStatus(true);
                setIsOpen(false);
              }}
            >
              Done
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid className="modal-statistic__grid">
          {doneExercisesDuringSession.map((e) => (
            <IonRow className="modal-statistic__row">
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
}

export default ModalWindowsStatistic;
