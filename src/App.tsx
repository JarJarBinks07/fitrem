import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonCol,
  IonContent,
  IonGrid,
  IonRouterOutlet,
  IonRow,
  IonSpinner,
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

import TimerConfig from "./pages/TimerConfigPage/TimerConfig";
import TimerPage from "./pages/TimerPage/Timer";
import Home from "./pages/HomePage/Home";
import { useCombineStates } from "./store/useCombineStates";

setupIonicReact();

const App: React.FC = () => {
  const { rehydrated } = useCombineStates();
  return (
    <IonApp>
      {rehydrated ? (
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/timer">
              <TimerPage />
            </Route>
            <Route exact path="/timer-configuration">
              <TimerConfig />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      ) : (
        <IonSpinner className="spinner" />
      )}
    </IonApp>
  );
};

export default App;
