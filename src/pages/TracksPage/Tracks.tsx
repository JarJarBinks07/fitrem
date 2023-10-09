import React, { useState } from "react";
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
  const { setSelectedCategories, selectedCategories } = useCombineStates();

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
              <div key={item.id}>
                <IonRow>
                  <IonCol size="2">
                    <IonCheckbox
                      className="tracks__check_box"
                      checked={selectedCategories.includes(item.category)}
                      onIonChange={() => setSelectedCategories(item.category)}
                    ></IonCheckbox>
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
              </div>
            ))}
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Tracks;
