import React, { useState } from "react";

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRange,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";

import { helpCircleOutline } from "ionicons/icons";
import { useCombineStates } from "../../store/useCombineStates";
import TimerConfirmationSettings from "./components/TimerConfirmationSettings";

type RangeValue =
  | number
  | {
      lower: number;
      upper: number;
    };

const TimerConfig: React.FC = () => {
  const { timerConfiguration, setTimerConfiguration, setRemainingTime } = useCombineStates();
  const [initialValue, setInitialValue] = useState<RangeValue>(timerConfiguration);
  const [isOpen, setIsOpen] = useState(false);

  const onSaveHandler = () => {
    setTimerConfiguration(initialValue as number);
    setRemainingTime(0);
    setIsOpen(true);
  };

  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar color="warning">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/timer" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonText>
                <h2>Timer Settings</h2>
                <p>
                  Your timer is set to ring in {initialValue.toString()} minutes.
                  <IonIcon slot="icon-only" icon={helpCircleOutline} color="primary"></IonIcon>
                </p>
              </IonText>

              <IonRange
                min={5}
                max={60}
                step={5}
                snaps={true}
                color="primary"
                value={initialValue}
                onIonChange={(e) => setInitialValue(e.detail.value)}
              >
                <IonLabel slot="start">5 min</IonLabel>
                <IonLabel slot="end">60 min</IonLabel>
              </IonRange>
              <IonText>
                <small>
                  If you wish to change the settings drag the nob to the desired time interval (5 to
                  60 minutes).
                </small>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText></IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={onSaveHandler}>
                Save
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <TimerConfirmationSettings isOpen={isOpen} setIsOpen={setIsOpen} />
      </IonContent>
    </IonPage>
  );
};

export default TimerConfig;
