import React, { useState, useEffect, useRef } from "react";
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
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
  IonRow,
  IonSpinner,
  IonText,
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
import ModalWindowTracks from "../../components/ModalWindow/ModalWindowTracks";
import { dataTracks } from "../../shared/tracks/tracks";

// type Track = {
//   id: number;
//   title: string;
//   description: string;
//   active: number;
// };

const Tracks: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");

  const handlerCategory = (value: string) => {
    setIsOpen(true);
    setCurrentCategory(value);
  };

  const trackCategory = [
    {
      id: 0,
      category: "Biceps",
      img_path: "/assets/icons/bicep_image.png",
    },
    {
      id: 1,
      category: "Jumps",
      img_path: "/assets/icons/jump_image.png",
    },
    {
      id: 2,
      category: "Steps",
      img_path: "/assets/icons/step_image.png",
    },
  ];

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
          <IonGrid>
            {trackCategory.map((item) => (
              <>
                <IonRow key={item.id}>
                  <IonCol size="2">
                    <IonCheckbox className="tracks__check_box"></IonCheckbox>
                  </IonCol>
                  <IonCol>
                    <IonItem button className="track__item" onClick={() => handlerCategory(item.category)}>
                      <IonThumbnail>
                        <img src={item.img_path} alt="" />
                      </IonThumbnail>
                      <IonTitle>{item.category} category</IonTitle>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <ModalWindowTracks isOpen={isOpen} setIsOpen={setIsOpen} category={currentCategory} />
              </>
            ))}
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Tracks;
