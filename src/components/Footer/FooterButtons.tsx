import React from "react";
import { IonBadge, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";

import { home, options, optionsOutline, optionsSharp, settings, timer } from "ionicons/icons";

import "./FooterButtons.css";

const FooterButtons: React.FC = () => {
  return (
    <>
      <IonTabBar slot="bottom" color="warning" className="footer__bar">
        <IonTabButton className="my-tab-button" tab="timer" href="/timer">
          <IonIcon icon={timer} />
          <IonLabel>Timer</IonLabel>
        </IonTabButton>
        <IonTabButton className="my-tab-button" tab="home" href="/home">
          <IonIcon icon={optionsOutline} />
          <IonLabel>Home</IonLabel>
          {/* <IonBadge color="danger">1</IonBadge> */}
        </IonTabButton>

        <IonTabButton className="my-tab-button" tab="settings" href="/settings">
          <IonIcon icon={settings} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </>
  );
};
export default FooterButtons;
