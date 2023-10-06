import React, { useState, useEffect, useRef } from "react";
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonReorder,
  IonReorderGroup,
  IonRouterOutlet,
  IonSpinner,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ItemReorderEventDetail } from "@ionic/core";
import {
  listCircleOutline,
  listCircle,
  powerOutline,
  radioButtonOnOutline,
  informationCircleOutline,
  personCircle,
  backspaceOutline,
  personCircleSharp,
} from "ionicons/icons";

// import { getTrackList } from "../../selectors/track-selectors";
// import { setTrackStatus } from "../../setters/track-setters";
// import TrackFormModal from "../modals/TrackFormModal";
// import TracksHelpModal from "../../components/tracks/TracksHelpModal";

import "./Tracks.css";
import MainMenu from "../../components/Menu/ProfileMenu";
import ProfileMenu from "../../components/Menu/ProfileMenu";

// type Track = {
//   id: number;
//   title: string;
//   description: string;
//   active: number;
// };

const Tracks: React.FC = () => {
  return (
    <>
      <ProfileMenu />
      <IonPage id="profile">
        <IonHeader>
          <IonToolbar color="warning">
            <IonButtons slot="primary">
              <IonMenuToggle>
                <IonButton className="track__bar_btn">
                  <IonIcon slot="icon-only" icon={personCircle} color="dark"></IonIcon>
                </IonButton>
              </IonMenuToggle>
            </IonButtons>
            <IonTitle>Tracks</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          <IonList>
            <IonItem button className="track__item">
              <IonCheckbox slot="start"></IonCheckbox>
              <IonThumbnail>
                <img alt="Bicep" src="/assets/icons/bicep_image.png" />
              </IonThumbnail>
              <IonTitle>Bicep category</IonTitle>
            </IonItem>
            <IonItem button className="track__item">
              <IonCheckbox slot="start"></IonCheckbox>
              <IonThumbnail>
                <img alt="Bicep" src="/assets/icons/step_image.png" />
              </IonThumbnail>
              <IonTitle>Step category</IonTitle>
            </IonItem>
            <IonItem button className="track__item">
              <IonCheckbox slot="start" onIonChange={() => console.log("true")}></IonCheckbox>
              <IonThumbnail>
                <img alt="Bicep" src="/assets/icons/jump_image.png" />
              </IonThumbnail>
              <IonTitle>Jump category</IonTitle>
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Tracks;
