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
  IonMenuToggle,
  IonPage,
  IonReorder,
  IonReorderGroup,
  IonRow,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { personCircle } from "ionicons/icons";
import ProfileMenu from "../../components/Menu/ProfileMenu";
import ModalWindowTracks from "../../components/ModalWindow/ModalWindowTracks";
import { useCombineStates } from "../../store/useCombineStates";

import "./Tracks.css";

const Tracks: React.FC = () => {
  const {
    setSelectedTracks: setSelectedCategories,
    selectedTracks: selectedCategories,
    tracks,
    generateUserTraining,
  } = useCombineStates();

  //////////////ModalWindow/////////////
  const [isOpen, setIsOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");
  const handlerCategory = (value: string) => {
    setIsOpen(true);
    setCurrentCategory(value);
  };
  console.log(isOpen);

  ///////////Reorder///////////
  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log("Dragged from index", event.detail.from, "to", event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
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
            {/* <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}> */}
            {tracks.map((item) => (
              <div key={item.id}>
                {/* <IonReorder> */}
                <IonRow>
                  <IonCol size="2">
                    <IonCheckbox
                      style={{ position: "absolute", right: 0, zIndex: "999" }}
                      className="tracks__check_box"
                      checked={selectedCategories.includes(item.category)}
                      onIonChange={() => {
                        setSelectedCategories(item.category);
                        generateUserTraining();
                      }}
                    ></IonCheckbox>
                  </IonCol>
                  <IonCol>
                    <IonItem button lines="full" className="track__item" onClick={() => handlerCategory(item.category)}>
                      <IonThumbnail>
                        <img src={item.img_path} alt="" />
                      </IonThumbnail>
                      <IonTitle>{item.category} category</IonTitle>
                    </IonItem>
                  </IonCol>
                </IonRow>
                {/* </IonReorder> */}
              </div>
            ))}
            {/* </IonReorderGroup> */}
          </IonGrid>
        </IonContent>
        <ModalWindowTracks isOpen={isOpen} setIsOpen={setIsOpen} category={currentCategory} />
      </IonPage>
    </>
  );
};

export default Tracks;
