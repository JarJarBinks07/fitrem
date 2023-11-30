import React, { useState } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonPage, IonRange, IonRow, IonText } from "@ionic/react";
import { helpCircleOutline } from "ionicons/icons";
import { useCombineStates } from "../../store/useCombineStates";
import { Header, ProfileMenu } from "../../components";
import "./Settings.css";

type RangeValue =
  | number
  | {
      lower: number;
      upper: number;
    };

const Settings: React.FC = () => {
  const {
    timerNotificationInterval: timerInterval,
    setTimerNotificationInterval: setTimerInterval,
    unsetNotificationTimer: unsetTimer,
    badges,
  } = useCombineStates();
  const [initialValue, setInitialValue] = useState<RangeValue>(timerInterval);
  const [isOpen, setIsOpen] = useState(false);

  const onSaveHandler = () => {
    setTimerInterval(initialValue as number);
    setIsOpen(true);
    unsetTimer();
  };

  return (
    <div>
      <ProfileMenu />
      <IonPage id="profile">
        <Header title="Settings" badges={badges} />
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
                <IonButton id="settings-test" expand="block" onClick={onSaveHandler} className="buttonTest">
                  Save
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default Settings;
