import React, { useState } from "react";
import { ItemReorderEventDetail } from "@ionic/core";
import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonPage,
  IonReorder,
  IonReorderGroup,
  IonRow,
  IonThumbnail,
  IonTitle,
} from "@ionic/react";

import { chevronForwardOutline, personCircle } from "ionicons/icons";
import { ProfileMenu, TourGuide } from "../../components/";
import ModalWindowTracks from "../../components/ModalWindows/WindowTacks/ModalWindowTracks";
import { useCombineStates } from "../../store/useCombineStates";

import "./Tracks.css";
import { useLocation } from "react-router";
import { Header } from "../../components";

const Tracks: React.FC = () => {
  const {
    badges,
    allTracks,
    selectedCategoryTracks,
    setOrderTracks,
    generateUserTraining,
    setIsOpenProfileMenu,
    setSelectedCategory,
    setSelectedAllCategories,
    setReorderedSelectedCategory,
    unsetWhenDone,
  } = useCombineStates();

  // use for tour guide
  const location = useLocation();
  const path = location.pathname.slice(1);

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
    newArrOfTracks.splice(event.detail.to, 0, removedTrackFrom);
    setOrderTracks(newArrOfTracks);
    setReorderedSelectedCategory();
    generateUserTraining();
    unsetWhenDone();
    event.detail.complete();
  }
  // use for select all tracks
  const onSelectAll = () => {
    setSelectedAllCategories();
    unsetWhenDone();
    generateUserTraining();
  };

  return (
    <>
      <ProfileMenu />
      <IonPage id="profile">
        <Header title="Tracks" badges={badges} path={"/track"} onSelect={onSelectAll} />
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
                      setSelectedCategory(item.category);
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
            {/* for tour guide */}
            <IonRow>
              <IonCol id="checkbox" style={{ margin: "-7vh 0 0 0", padding: "5vh 0 20px 0" }}></IonCol>
              <IonCol size="8"></IonCol>
              <IonCol id="selection-btn" style={{ margin: "-7vh 0 0 0" }}></IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
        <ModalWindowTracks isOpen={isOpen} setIsOpen={setIsOpen} category={currentCategory} unsetWhenDone={unsetWhenDone} />
      </IonPage>
      {path === "tracks" ? <TourGuide path={path} /> : null}
    </>
  );
};

export default Tracks;
