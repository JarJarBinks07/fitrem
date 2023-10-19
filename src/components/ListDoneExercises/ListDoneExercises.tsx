import React from "react";
import { IonTitle, IonItem, IonCol, IonRow, IonIcon } from "@ionic/react";
import CachedImage from "../CachedImage/CachedImage";
import { checkmarkCircleOutline, chevronForward } from "ionicons/icons";

import "./ListDoneExercises.css";

interface IProps {
  category: string;
  exercise: string;
  path: string;
}

function ListDoneExercises({ category, exercise, path }: IProps) {
  return (
    <IonRow className="list-done__row">
      <IonCol>
        <IonItem className="track-page__item" lines="none">
          <CachedImage path={path} />
        </IonItem>
      </IonCol>
      <IonCol size="5">
        <IonTitle>{exercise}</IonTitle>
      </IonCol>
      <IonCol className="list-done__col">
        <IonItem lines="none" className="list-done__item">
          <IonIcon
            color="success"
            slot="end"
            icon={checkmarkCircleOutline}
            size="large"
            // className="list-done__icon"
          ></IonIcon>
        </IonItem>
        {/* <IonIcon slot="icon-only" icon={checkmarkCircleOutline} style={{ color: "black" }}></IonIcon> */}
      </IonCol>
      <IonCol></IonCol>
    </IonRow>
  );
}

export default ListDoneExercises;
