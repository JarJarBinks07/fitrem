import React, { useState } from "react";
import { ItemReorderEventDetail } from "@ionic/core";
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
  IonLabel,
  IonMenuToggle,
  IonPage,
  IonReorder,
  IonReorderGroup,
  IonRow,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { chevronForwardOutline, personCircle } from "ionicons/icons";
import ProfileMenu from "../../components/Menu/ProfileMenu";
import ModalWindowTracks from "../../components/ModalWindows/ModalWindowTacks/ModalWindowTracks";
import { useCombineStates } from "../../store/useCombineStates";

import "./Tracks.css";

const Tracks: React.FC = () => {
  const {
    setReorderedSelectedCategoryTracks,
    setSelectedCategoryTracks,
    selectedCategoryTracks,
    allTracks,
    generateUserTraining,
    setOrderTracks,
    unsetWhenDone,
  } = useCombineStates();

  // ModalWindow
  const [isOpen, setIsOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");
  const handlerCategory = (value: string) => {
    setIsOpen(true);
    setCurrentCategory(value);
  };

  // Change order tracks
  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    const newArrOfTracks = [...allTracks];
    const [removedTrackFrom] = newArrOfTracks.splice(event.detail.from, 1);
    console.log(removedTrackFrom);
    newArrOfTracks.splice(event.detail.to, 0, removedTrackFrom);
    setOrderTracks(newArrOfTracks);
    setReorderedSelectedCategoryTracks();
    generateUserTraining();
    unsetWhenDone();
    event.detail.complete();
  }

  return (
    <>
      <ProfileMenu />
      <IonPage id="profile">
        <IonHeader>
          <IonToolbar color="warning">
            <IonButtons slot="primary">
              <IonMenuToggle>
                <IonButton className="tracks-page__profile_btn">
                  <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
                </IonButton>
              </IonMenuToggle>
            </IonButtons>
            <IonTitle className="tracks-page__title">Tracks</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          <IonGrid>
            <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
              {allTracks.map((item) => (
                <div key={item.id}>
                  <IonCheckbox
                    style={{ position: "fixed", left: 0, padding: 20 }}
                    className="tracks-page__check_box"
                    checked={selectedCategoryTracks.includes(item.category)}
                    onIonChange={() => {
                      setSelectedCategoryTracks(item.category);
                      unsetWhenDone();
                      generateUserTraining();
                    }}
                  />
                  <IonButton
                    className="track-page__content__btn"
                    onClick={() => handlerCategory(item.category)}
                    style={{ position: "fixed", right: 0, zIndex: 5, padding: 15 }}
                  >
                    <IonIcon slot="end" icon={chevronForwardOutline}></IonIcon>
                  </IonButton>

                  <IonReorder>
                    <IonRow>
                      <IonCol size="2"></IonCol>
                      <IonCol>
                        <IonItem lines="full" className="track-page__item">
                          <IonThumbnail>
                            <img src={item.img_path} alt="" />
                          </IonThumbnail>
                          <IonTitle>{item.category} category</IonTitle>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonReorder>
                </div>
              ))}
            </IonReorderGroup>
          </IonGrid>
        </IonContent>
        <ModalWindowTracks isOpen={isOpen} setIsOpen={setIsOpen} category={currentCategory} unsetWhenDone={unsetWhenDone} />
      </IonPage>
    </>
  );
};

export default Tracks;
