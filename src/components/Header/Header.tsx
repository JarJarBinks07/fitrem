import React from "react";
import { IonBadge } from "@ionic/react";
import { IonButton, IonButtons, IonHeader, IonIcon, IonMenuToggle, IonTitle, IonToolbar } from "@ionic/react";
import { personCircle } from "ionicons/icons";

import "./Header.css";

interface IProps {
  title: string;
  badges: number;
}

const Header: React.FC<IProps> = ({ title, badges }) => {
  return (
    <IonHeader className="header">
      <IonToolbar color="warning">
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
