import React from "react";
import {
  IonBadge,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

import { Redirect, Route, Switch } from "react-router";

import { home, stopwatch, layers, settings } from "ionicons/icons";
import MainMenu from "./MainMenu";

import "./MainTabs.css";
import Home from "../../pages/HomePage/Home";
import TimerPage from "../../pages/TimerPage/Timer";
import TimerConfig from "../../pages/TimerConfigPage/TimerConfig";

const MainTabs: React.FC = () => {
  return (
    <>
      <MainMenu />
      {/* <IonTabs>
        <IonRouterOutlet id="main">
          <Switch>
            <Route path="/main/home" component={Home} exact={true} />
            <Route path="/main/timer" component={TimerPage} exact={true} />
            <Route path="/main/timer-configuration" component={TimerConfig} exact={true} />
          </Switch>
          <Route path="/main" render={() => <Redirect to="/main/home" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom" color="warning">
          <IonTabButton className="my-tab-button" tab="home" href="/main/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
            <IonBadge color="danger">1</IonBadge>
          </IonTabButton>
          <IonTabButton className="my-tab-button" tab="timer" href="/main/timer">
            <IonIcon icon={stopwatch} />
            <IonLabel>Timer</IonLabel>
          </IonTabButton>
          <IonTabButton className="my-tab-button" tab="settings" href="/main/timer-configuration">
            <IonIcon icon={settings} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs> */}
    </>
  );
};
export default MainTabs;
