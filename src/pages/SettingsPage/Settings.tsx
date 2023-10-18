import React, { useState } from "react";
import { IonDatetime } from "@ionic/react";
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
  IonMenuToggle,
  IonPage,
  IonRange,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { helpCircleOutline, personCircle } from "ionicons/icons";
import { useCombineStates } from "../../store/useCombineStates";
import TimerConfirmationSettings from "./components/TimerConfirmationSettings";
import Chart from "../../components/Chart/Chart";
import FooterButtons from "../../components/Footer/FooterButtons";
import ProfileMenu from "../../components/Menu/ProfileMenu";

import "./Settings.css";
import Demo from "../../components/Demo/Demo";

type RangeValue =
  | number
  | {
      lower: number;
      upper: number;
    };

const Settings: React.FC = () => {
  const { timerInterval, setTimerInterval, unsetTimer } = useCombineStates();
  const [initialValue, setInitialValue] = useState<RangeValue>(timerInterval);
  const [isOpen, setIsOpen] = useState(false);

  const onSaveHandler = () => {
    setTimerInterval(initialValue as number);
    setIsOpen(true);
    unsetTimer();
  };

  return (
    <>
      <ProfileMenu />
      <IonPage id="profile">
        <IonHeader>
          <IonToolbar color="warning">
            <IonButtons slot="primary">
              <IonMenuToggle>
                <IonButton className="settings-page__profile_btn">
                  <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
                </IonButton>
              </IonMenuToggle>
            </IonButtons>
            <IonTitle className="settings-page__title">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonText>
                  <h2>Timer Settings</h2>
                  <p>
                    Your timer is set to ring in {initialValue.toString()} seconds.
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
                  <IonLabel slot="start">5 sec</IonLabel>
                  <IonLabel slot="end">60 sec</IonLabel>
                </IonRange>
                <IonText>
                  <small>
                    If you wish to change the settings drag the nob to the desired time interval (5 to 60 seconds).
                  </small>
                </IonText>
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
          {/* <Chart />
           */}
          <IonDatetime></IonDatetime>
          {/* <Demo /> */}
          <TimerConfirmationSettings isOpen={isOpen} setIsOpen={setIsOpen} />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Settings;
