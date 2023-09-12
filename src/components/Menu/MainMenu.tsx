import React from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { logoFacebook, logoInstagram, mailOpen, stopwatch, videocam } from "ionicons/icons";

import "./MainMenu.css";

const MainMenu: React.FC = () => {
  const onPromoBlockClickHandler = () => {
    window.location.href = "https://backpackgym.com";
  };

  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonMenuToggle>
            <IonItem lines="full" button routerLink="/timer">
              <IonIcon slot="start" icon={stopwatch} />
              <IonLabel>Start Your Workout</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem lines="full" button href="https://backpackgym.com/contact">
              <IonIcon slot="start" icon={videocam} />
              <IonLabel>Video Tutorial</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem lines="full" button href="https://backpackgym.com/contact">
              <IonIcon slot="start" icon={mailOpen} />
              <IonLabel>Contact</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem lines="none">
              <IonButtons slot="end">
                <IonButton href="https://facebook.com/backpackgym">
                  <IonIcon slot="icon-only" icon={logoFacebook}></IonIcon>
                </IonButton>
                <IonButton href="https://facebook.com/backpackgym">
                  <IonIcon slot="icon-only" icon={logoInstagram}></IonIcon>
                </IonButton>
              </IonButtons>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem className="bpg-block" onClick={onPromoBlockClickHandler}></IonItem>
          </IonMenuToggle>
        </IonList>
        <div slot="fixed" className="app-info">
          <p>
            Presented by Backpack Gym&reg; <br />
            App version 1.0.1
          </p>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default MainMenu;
