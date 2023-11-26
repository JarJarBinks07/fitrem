import React, { useState } from "react";
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeCircleOutline, home, settings, chatbubbles, person, timer, caretDown, ribbon } from "ionicons/icons";
import { menuController } from "@ionic/core/components";
import "./ProfileMenu.css";
import ProfileChart from "../Chart/Graph/ProfileChart";
import { useWatcher } from "../../shared/hooks/useWatcher";
import { useCombineStates } from "../../store/useCombineStates";
import Chart from "../Chart/Chart";
import SelectorForChart from "../Chart/components/SelectorForChart/SelectorForChart";
import ChartSelector from "../Chart/components/SelectorForChart/ChartSelector";
import ModalProfileWindows from "../ModalWindows/ProfileWindow/ModalProfileWindows";
import ModalRewardsWindow from "../ModalWindows/RewardsWindow/ModalRewardsWindow";
import ModalMessageWindow from "../ModalWindows/MessageWindow/ModalMessageWindow";

const ProfileMenu: React.FC = () => {
  const { setOnFocus } = useWatcher();
  const { isOpenProfileMenu, chartInterval, setIsOpenProfileMenu, setChartInterval } = useCombineStates();

  //use for buttons below stats

  const [isProfileWindow, setIsProfileWindow] = useState(false);
  const [isRewardsWindow, setIsRewardsWindow] = useState(false);
  const [isMessageWindow, setIsMessageWindow] = useState(false);

  //use for closing side menu
  // const closeMenu = async () => {
  //   await menuController.close("profile__menu");
  // };

  const profileArr = [
    { icon: person, label: "Profile", func: setIsProfileWindow },
    { icon: ribbon, label: "Activities & Rewards", func: setIsRewardsWindow },
    { icon: chatbubbles, label: "Message", func: setIsMessageWindow },
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
                    <IonIcon slot="start" icon={item.icon} className="profile__icon" color="dark" />
                    <IonLabel color="dark">{item.label}</IonLabel>
                  </IonButton>
                </IonButtons>
              </div>
              // <IonMenuToggle key={item.label}>
              //   <IonItem button={true} detail={false} className="profile__item">
              //     <IonIcon slot="start" icon={item.icon} className="profile__icon" />
              //     <IonLabel>{item.label}</IonLabel>
              //   </IonItem>
              // </IonMenuToggle>
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
