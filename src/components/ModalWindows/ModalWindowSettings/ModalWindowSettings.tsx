import React, { useState } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonText,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonLabel,
  IonList,
  IonThumbnail,
  IonRouterLink,
  IonFooter,
  IonRange,
  IonIcon,
} from "@ionic/react";

import "./ModalWindowSettings.css";
import { useCombineStates } from "../../../store/useCombineStates";
import { stopwatchOutline } from "ionicons/icons";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
type RangeValue = number | { lower: number; upper: number };

function ModalWindowSettings({ isOpen, setIsOpen }: IProps) {
  const {
    timerInterval,
    workIntervalForTraining,
    restIntervalForTraining,
    setWorkIntervalForTraining,
    setRestIntervalForTraining,
    setTimerInterval,
    unsetWhenDone,
  } = useCombineStates();
  const [initialValue, setInitialValue] = useState<RangeValue>(timerInterval);
  const [workoutValue, setWorkoutValue] = useState<RangeValue>(workIntervalForTraining);
  const [restValue, setRestValue] = useState<RangeValue>(restIntervalForTraining);

  const onSaveHandler = () => {
    setTimerInterval(initialValue as number);
    setWorkIntervalForTraining(workoutValue as number);
    setRestIntervalForTraining(restValue as number);
    unsetWhenDone();
    setIsOpen(false);
  };

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Workout Settings</IonTitle>
          <IonButtons slot="end">
            <IonButton className="modal-settings__btn" onClick={onSaveHandler}>
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
                I want to workout every <b>{initialValue.toString()}</b> minutes
              </IonLabel>
            </IonItem>
            {/* IonRange doesn't work as separate JSX component*/}
            <IonRange
              className="modal-settings__range_notification"
              aria-label="Range with ionChange"
              min={5}
              max={60}
              step={5}
              value={initialValue}
              onIonChange={(e) => setInitialValue(e.detail.value)}
            >
              <IonIcon className="modal-settings__watch_left" slot="start" icon={stopwatchOutline}></IonIcon>
              <IonIcon className="modal-settings__watch_right" slot="end" icon={stopwatchOutline} size="large"></IonIcon>
            </IonRange>
            <IonItem lines="none">
              <IonLabel class="ion-text-wrap">
                ...by performing each exercises for <b>{workoutValue.toString()}</b> seconds
              </IonLabel>
            </IonItem>
            {/* IonRange doesn't work as separate JSX component*/}
            <IonRange
              className="modal-settings__range_notification"
              aria-label="Range with ionChange"
              min={5}
              max={60}
              step={5}
              value={workoutValue}
              onIonChange={(e) => setWorkoutValue(e.detail.value)}
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
              onIonChange={(e) => setRestValue(e.detail.value)}
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
