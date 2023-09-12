import React from "react";
import { IonBadge, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";

import { home, stopwatch, layers, settings } from "ionicons/icons";

import "./MainTabs.css";

const BottomMenu: React.FC = () => {
  return (
    <IonTabBar slot="bottom" color="warning">
      <IonTabButton className="my-tab-button" tab="home" href="/home">
        <IonIcon icon={home} />
        <IonLabel>Home</IonLabel>
        <IonBadge color="danger">1</IonBadge>
      </IonTabButton>
      <IonTabButton className="my-tab-button" tab="timer" href="/timer">
        <IonIcon icon={stopwatch} />
        <IonLabel>Timer</IonLabel>
      </IonTabButton>
      <IonTabButton className="my-tab-button" tab="settings" href="/timer-configuration">
        <IonIcon icon={settings} />
        <IonLabel>Settings</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};
export default BottomMenu;
