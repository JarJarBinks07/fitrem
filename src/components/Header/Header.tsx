import React from "react";
import { IonBadge } from "@ionic/react";
import { IonButton, IonButtons, IonHeader, IonIcon, IonMenuToggle, IonTitle, IonToolbar } from "@ionic/react";
import { personCircle } from "ionicons/icons";

import "./Header.css";

interface IProps {
  title: string;
  badges: number;
  path?: string;
  onSelect?: () => void;
}

const Header: React.FC<IProps> = ({ title, badges, path, onSelect }) => {
  return (
    <IonHeader className="header">
      <IonToolbar color="warning">
        {path ? (
          <IonButtons slot="start">
            <IonButton className="tracks__modal_btn" onClick={onSelect}>
              Select all
            </IonButton>
          </IonButtons>
        ) : null}
        <IonButtons slot="primary">
          <IonMenuToggle>
            <IonButton className="header__btn">
              <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
              {badges > 0 ? (
                <IonBadge className="header__badge" color="danger">
                  {badges}
                </IonBadge>
              ) : null}
            </IonButton>
          </IonMenuToggle>
        </IonButtons>
        <IonTitle className="header__title">{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
