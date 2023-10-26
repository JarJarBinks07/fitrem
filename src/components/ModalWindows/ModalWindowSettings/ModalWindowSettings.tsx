import React, { useState } from "react";
import { stopwatchOutline } from "ionicons/icons";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonCard,
  IonCardContent,
  IonLabel,
  IonRouterLink,
  IonFooter,
  IonRange,
  IonIcon,
} from "@ionic/react";

import "./ModalWindowSettings.css";

interface IProps {
  isOpen: boolean;
  timerNotificationInterval: number;
  timerTrainingInterval: number;
  timerRestInterval: number;
  onSaveHandler: (notificationValue: number, trainingValue: number, restValue: number) => void;
}

function ModalWindowSettings({
  isOpen,
  timerNotificationInterval,
  timerTrainingInterval,
  timerRestInterval,
  onSaveHandler,
}: IProps) {
  const [notificationValue, setNotificationValue] = useState(timerNotificationInterval);
  const [trainingValue, setTrainingValue] = useState(timerTrainingInterval);
  const [restValue, setRestValue] = useState(timerRestInterval);

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Workout Settings</IonTitle>
          <IonButtons slot="end">
            <IonButton
              className="modal-settings__btn"
              onClick={() => onSaveHandler(notificationValue, trainingValue, restValue)}
            >
              Done
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonHeader>
          <IonItem lines="none">
            <IonLabel class="ion-text-wrap">Please make the selection to customize your workout.</IonLabel>
          </IonItem>
        </IonHeader>

        <IonCard>
          <IonCardContent>
            <IonItem lines="none">
              <IonLabel class="ion-text-wrap">
                I want to workout every <b>{notificationValue.toString()}</b> minutes
              </IonLabel>
            </IonItem>
            {/* IonRange doesn't work as separate JSX component*/}
            <IonRange
              className="modal-settings__range_notification"
              aria-label="Range with ionChange"
              min={5}
              max={60}
              step={5}
              value={notificationValue}
              onIonChange={(e) => setNotificationValue(e.detail.value as number)}
            >
              <IonIcon className="modal-settings__watch_left" slot="start" icon={stopwatchOutline}></IonIcon>
              <IonIcon className="modal-settings__watch_right" slot="end" icon={stopwatchOutline} size="large"></IonIcon>
            </IonRange>
            <IonItem lines="none">
              <IonLabel class="ion-text-wrap">
                ...by performing each exercises for <b>{trainingValue.toString()}</b> seconds
              </IonLabel>
            </IonItem>
            {/* IonRange doesn't work as separate JSX component*/}
            <IonRange
              className="modal-settings__range_notification"
              aria-label="Range with ionChange"
              min={5}
              max={60}
              step={5}
              value={trainingValue}
              onIonChange={(e) => setTrainingValue(e.detail.value as number)}
            >
              <IonIcon className="modal-settings__watch_left" slot="start" icon={stopwatchOutline}></IonIcon>
              <IonIcon className="modal-settings__watch_right" slot="end" icon={stopwatchOutline} size="large"></IonIcon>
              {/* IonRange doesn't work as separate JSX component*/}
            </IonRange>
            <IonItem lines="none">
              <IonLabel class="ion-text-wrap">
                ...and taking a <b>{restValue.toString()}</b> seconds break between each exercises
              </IonLabel>
            </IonItem>
            <IonRange
              className="modal-settings__range_notification"
              aria-label="Range with ionChange"
              min={5}
              max={60}
              step={5}
              value={restValue}
              onIonChange={(e) => setRestValue(e.detail.value as number)}
            >
              <IonIcon className="modal-settings__watch_left" slot="start" icon={stopwatchOutline}></IonIcon>
              <IonIcon className="modal-settings__watch_right" slot="end" icon={stopwatchOutline} size="large"></IonIcon>
            </IonRange>
          </IonCardContent>
        </IonCard>

        <IonFooter>
          <IonItem lines="none">
            <IonLabel class="ion-text-wrap">Please make the selection to customize your workout.</IonLabel>
          </IonItem>
          <IonItem className="modal-settings__link" lines="none">
            <IonRouterLink href="https://backpackgym.com">https://backpackgym.com</IonRouterLink>
          </IonItem>
        </IonFooter>
      </IonContent>
    </IonModal>
  );
}

export default ModalWindowSettings;
