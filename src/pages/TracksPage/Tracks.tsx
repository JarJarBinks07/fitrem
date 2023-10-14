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

import { chevronForwardOutline, create, personCircle } from "ionicons/icons";
import ProfileMenu from "../../components/Menu/ProfileMenu";
import ModalWindowTracks from "../../components/ModalWindow/ModalWindowTracks";
import { useCombineStates } from "../../store/useCombineStates";

import "./Tracks.css";
import { ITrack } from "../../store/TracksState";

const Tracks: React.FC = () => {
  const {
    setReorderedSelectedCategoryTracks,
    setSelectedCategoryTracks,
    selectedCategoryTracks,
    tracks,
    generateUserTraining,
    setOrderTracks,
  } = useCombineStates();

  //////////////ModalWindow/////////////
  const [isOpen, setIsOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");
  const handlerCategory = (value: string) => {
    setIsOpen(true);
    setCurrentCategory(value);
  };
  console.log(isOpen);
  // const [replacedTracks, setReplacedTracks] = useState<string[]>(["Biceps", "Jumps", "Steps"]);
  console.log(tracks);
  console.log(selectedCategoryTracks);
  ///////////Change order tracks///////////
  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    const newArrOfTracks = [...tracks];
    const [removedTrackFrom] = newArrOfTracks.splice(event.detail.from, 1);
    console.log(removedTrackFrom);
    newArrOfTracks.splice(event.detail.to, 0, removedTrackFrom);
    setOrderTracks(newArrOfTracks);
    setReorderedSelectedCategoryTracks();
    generateUserTraining();
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
                <IonButton className="toggle__bar_btn">
                  <IonIcon slot="icon-only" icon={personCircle} color="dark"></IonIcon>
                </IonButton>
              </IonMenuToggle>
            </IonButtons>
            <IonTitle>Tracks</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          <IonGrid>
            <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
              {tracks.map((item) => (
                <div key={item.id}>
                  <IonCheckbox
                    style={{ position: "fixed", left: 0 }}
                    className="tracks__check_box"
                    checked={selectedCategoryTracks.includes(item.category)}
                    onIonChange={() => {
                      setSelectedCategoryTracks(item.category);
                      generateUserTraining();
                    }}
                  />

                  <IonButton
                    className="content__btn"
                    onClick={() => handlerCategory(item.category)}
                    style={{ position: "fixed", right: 0, zIndex: 5, margin: "15px 5px 0 0" }}
                  >
                    <IonIcon slot="end" icon={chevronForwardOutline}></IonIcon>
                  </IonButton>

                  <IonReorder>
                    <IonRow>
                      <IonCol size="2"></IonCol>
                      <IonCol>
                        <IonItem lines="full" className="track__item">
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
        <ModalWindowTracks isOpen={isOpen} setIsOpen={setIsOpen} category={currentCategory} />
      </IonPage>
    </>
  );
};

export default Tracks;
