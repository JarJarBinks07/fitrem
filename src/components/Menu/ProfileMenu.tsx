import React from "react";
import {
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
import { closeCircleOutline, home, settings, chatbubbles, person, timer, caretDown } from "ionicons/icons";

import "./ProfileMenu.css";
import ProfileChart from "../Chart/Graph/ProfileChart";
import { useWatcher } from "../../shared/hooks/useWatcher";
import { useCombineStates } from "../../store/useCombineStates";
import Chart from "../Chart/Chart";
import SelectorForChart from "../SelectorForChart/SelectorForChart";
import SelectorTest from "../SelectorForChart/SelectorTest";

const ProfileMenu: React.FC = () => {
  const { setOnFocus } = useWatcher();
  const { isOpenProfileMenu, chartInterval, setIsOpenProfileMenu, setChartInterval } = useCombineStates();

  const profileArr = [
    { icon: home, label: "Timer", router: "/timer" },
    { icon: person, label: "Profile", router: "/profile" },
    { icon: chatbubbles, label: "Message", router: "/message" },
    { icon: settings, label: "Settings", router: "/settings" },
  ];

  return (
    <div className="profile__container">
      <IonMenu contentId="profile" side="end">
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
            <IonTitle color="warning">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <SelectorForChart chartInterval={chartInterval} setChartInterval={setChartInterval} />
          {/* <SelectorTest chartInterval={chartInterval} setChartInterval={setChartInterval} /> */}
          <Chart />

          <IonList>
            {profileArr.map((item) => (
              <IonMenuToggle key={item.label}>
                <IonItem className="profile__item">
                  <IonIcon slot="start" icon={item.icon} className="profile__icon" />
                  <IonLabel>{item.label}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            ))}
          </IonList>
        </IonContent>
      </IonMenu>
    </div>
  );
};

export default ProfileMenu;
