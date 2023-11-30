import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Settings from "./pages/SettingsPage/Settings";
import TimerPage from "./pages/TimerPage/Timer";
import { useCombineStates } from "./store/useCombineStates";
import { timer, settings, optionsOutline } from "ionicons/icons";
import Tracks from "./pages/TracksPage/Tracks";
import { useGetData } from "./shared/hooks/useGetData";
import { useWatcher } from "./shared/hooks/useWatcher";
import { NativeAudio } from "@capacitor-community/native-audio";
import { useEffect, useState } from "react";

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

setupIonicReact();
const preloadAudio = async () => {
  NativeAudio.preload({
    assetId: "countdown",
    assetPath: "countdown.mp3",
    audioChannelNum: 1,
    isUrl: false,
  });
};
preloadAudio();

const App: React.FC = () => {
  // use for stopping and resuming timer and video when user switches in App
  const { setOnBlur, setOnFocus } = useWatcher();

  // get data from DB and write to FS and Zustand Storage
  const { fetchData } = useGetData();

  // use for audio message
  useEffect(() => {
    checkedDateAfterRegistration();
    fetchData();
  }, []);

  const { checkedDateAfterRegistration, isNotification } = useCombineStates();

  return (
    <>
      <IonApp className="app">
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/timer">
                <TimerPage />
              </Route>
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
                <IonButton id="timer-btn" className="app__btn" onClick={() => setOnFocus()}>
                  <IonIcon className="app__icon" icon={timer} />
                  {!isNotification ? (
                    <IonLabel className="app__label" color="light">
                      Training
                    </IonLabel>
                  ) : (
                    <IonLabel className="app__label" color="light">
                      Notification
                    </IonLabel>
                  )}
                </IonButton>
              </IonTabButton>
              <IonTabButton className="app__tab_button" tab="tracks" href="/tracks">
                <IonButton id="track-btn" className="app__btn" onClick={() => setOnBlur()}>
                  <IonIcon className="app__icon" icon={optionsOutline} />
                  <IonLabel className="app__label" color="light">
                    Tracks
                  </IonLabel>
                </IonButton>
              </IonTabButton>
              <IonTabButton className="app__tab_button" tab="settings" href="/settings">
                <IonButton className="app__btn" onClick={() => setOnBlur()}>
                  <IonIcon className="app__icon" icon={settings} />
                  <IonLabel className="app__label" color="light">
                    Settings
                  </IonLabel>
                </IonButton>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </>
  );
};

export default App;
