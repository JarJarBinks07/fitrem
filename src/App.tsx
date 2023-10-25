import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonSpinner,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./App.css";

import Settings from "./pages/SettingsPage/Settings";
import TimerPage from "./pages/TimerPage/Timer";
import Home from "./pages/HomePage/Home";
import { useCombineStates } from "./store/useCombineStates";
import { timer, settings, optionsOutline } from "ionicons/icons";
import Tracks from "./pages/TracksPage/Tracks";
import { useGetData } from "./shared/hooks/useGetData";

setupIonicReact();

const App: React.FC = () => {
  ////get data from DB and write to FS and Zustand Storage/////
  useGetData();

  const { rehydrated } = useCombineStates();
  return (
    <IonApp>
      {rehydrated ? (
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/timer">
                <TimerPage />
              </Route>
              {/* <Route exact path="/home">
                <Home />
              </Route> */}
              <Route exact path="/tracks">
                <Tracks />
              </Route>
              <Route exact path="/settings">
                <Settings />
              </Route>
              <Route exact path="/">
                <Redirect to="/timer" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar className="app__tab_bar" slot="bottom" color="warning">
              <IonTabButton className="app__tab_button" tab="timer" href="/timer">
                <IonIcon className="app__icon" icon={timer} />
                <IonLabel className="app__label" color="light">
                  Timer
                </IonLabel>
              </IonTabButton>
              <IonTabButton className="app__tab_button" tab="tracks" href="/tracks">
                <IonIcon className="app__icon" icon={optionsOutline} />
                <IonLabel className="app__label" color="light">
                  Tracks
                </IonLabel>
              </IonTabButton>
              <IonTabButton className="app__tab_button" tab="settings" href="/settings">
                <IonIcon className="app__icon" icon={settings} />
                <IonLabel className="app__label" color="light">
                  Settings
                </IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      ) : (
        <IonSpinner className="spinner" />
      )}
    </IonApp>
  );
};

export default App;
