import React, { useState } from "react";
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeCircleOutline, chatbubbles, person, ribbon } from "ionicons/icons";
import { useWatcher } from "../../shared/hooks/useWatcher";
import { useCombineStates } from "../../store/useCombineStates";
import Chart from "../Chart/Chart";
import ChartSelector from "../Chart/components/SelectorForChart/ChartSelector";
import ModalMessageWindow from "../ModalWindows/ModalMessageWindow/ModalMessageWindow";

import "./ProfileMenu.css";

export const ProfileMenu: React.FC = () => {
  const { setOnFocus } = useWatcher();

  const { isOpenProfileMenu, badges, setIsOpenProfileMenu, setChartInterval } = useCombineStates();

  const [isOpenWindow, setIsOpenWindow] = useState(false);

  const profileArr = [
    { icon: person, label: "Profile", isBadge: false },
    { icon: ribbon, label: "Activities & Rewards", isBadge: false },
    { icon: chatbubbles, label: "Message", isBadge: true, func: setIsOpenWindow },
  ];

  return (
    <div className="profile__container">
      <IonMenu contentId="profile" menuId="profile__menu" side="end">
        <IonHeader>
          <IonToolbar color="dark">
            <IonButtons slot="start">
              <IonMenuToggle>
                <IonButton
                  className="profile__bar_btn"
                  onClick={() => {
                    if (isOpenProfileMenu) {
                      setIsOpenProfileMenu(false);
                    }
                    setOnFocus();
                  }}
                >
                  <IonIcon slot="icon-only" icon={closeCircleOutline} color="warning" />
                </IonButton>
              </IonMenuToggle>
            </IonButtons>
            <IonTitle color="warning">Personal Details</IonTitle>
            <IonButtons slot="end">
              <IonButton className="profile__sign">Log in</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <ChartSelector setChartInterval={setChartInterval} />
          <Chart />

          <IonList className="profile__list">
            {profileArr.map((item) => (
              <div key={item.label}>
                <IonButtons className="profile__buttons">
                  <IonButton
                    onClick={() => {
                      item.func && item.func(true);
                    }}
                  >
                    <div className="profile__btn_container">
                      <IonIcon slot="start" icon={item.icon} className="profile__icon" color="dark" />
                      {badges > 0 && item.isBadge ? (
                        <IonBadge className="profile__badge" color="danger">
                          {badges}
                        </IonBadge>
                      ) : null}
                    </div>
                    <IonLabel className="profile__label" color="dark">
                      {item.label}
                    </IonLabel>
                  </IonButton>
                </IonButtons>
              </div>
            ))}
          </IonList>
        </IonContent>
      </IonMenu>
      <ModalMessageWindow isOpen={isOpenWindow} setIsOpen={setIsOpenWindow} />
    </div>
  );
};
