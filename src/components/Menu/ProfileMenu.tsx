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
import ModalProfileWindows from "../ModalWindows/ProfileWindow/ModalProfileWindows";
import ModalRewardsWindow from "../ModalWindows/RewardsWindow/ModalRewardsWindow";
import ModalMessageWindow from "../ModalWindows/MessageWindow/ModalMessageWindow";

import "./ProfileMenu.css";

const ProfileMenu: React.FC = () => {
  const { setOnFocus } = useWatcher();
  const { isOpenProfileMenu, badges, setIsOpenProfileMenu, setChartInterval } = useCombineStates();

  //use for buttons below stats

  const [isProfileWindow, setIsProfileWindow] = useState(false);
  const [isRewardsWindow, setIsRewardsWindow] = useState(false);
  const [isMessageWindow, setIsMessageWindow] = useState(false);

  //use for closing side menu
  // const closeMenu = async () => {
  //   await menuController.close("profile__menu");
  // };

  const profileArr = [
    { icon: person, label: "Profile", isBadge: false, func: setIsProfileWindow },
    { icon: ribbon, label: "Activities & Rewards", isBadge: false, func: setIsRewardsWindow },
    { icon: chatbubbles, label: "Message", isBadge: true, func: setIsMessageWindow },
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
              <IonButton
                className="profile__sign"
                onClick={() => {
                  setIsProfileWindow(true);
                }}
              >
                Log in
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {/* <SelectorForChart setChartInterval={setChartInterval} /> */}
          <ChartSelector setChartInterval={setChartInterval} />
          <Chart />

          <IonList className="profile__list">
            {profileArr.map((item) => (
              <div key={item.label}>
                <IonButtons className="profile__buttons">
                  <IonButton
                    onClick={() => {
                      item.func(true);
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
      <ModalProfileWindows isOpen={isProfileWindow} setIsOpen={setIsProfileWindow} />
      <ModalRewardsWindow isOpen={isRewardsWindow} setIsOpen={setIsRewardsWindow} />
      <ModalMessageWindow isOpen={isMessageWindow} setIsOpen={setIsMessageWindow} />
    </div>
  );
};

export default ProfileMenu;
