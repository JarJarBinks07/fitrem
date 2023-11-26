import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonImg,
  IonItem,
  IonRow,
  IonTitle,
} from "@ionic/react";

import "./RewardCard.css";

const RewardCard: React.FC = () => {
  return (
    <div className="card">
      <IonCard className="card__container">
        <IonCardHeader>
          <IonCardTitle className="card__title">Congratulations!</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid>
            <IonRow className="card__row_img">
              <IonCol>
                <IonImg className="card__img" src="./assets/rewards/main-reward.png" alt=""></IonImg>
              </IonCol>
            </IonRow>
            <IonRow className="card__row_button">
              <IonCol>
                <IonButton expand="block">Ok</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    </div>
  );
};
export default RewardCard;
