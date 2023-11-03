import { IonButton, IonCheckbox, IonInput, IonText, IonTextarea, IonTitle } from "@ionic/react";
// import { useMount, useSetState } from "react-use";
import React, { useEffect, useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { useCombineStates } from "../../store/useCombineStates";

import "./TourGuide.css";
import { NativeAudio } from "@capacitor-community/native-audio";

interface State {
  // run: boolean;
  steps: Step[];
}

// type Placement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';

const TourGuide: React.FC = () => {
  const { firstConnection, userName, isEquipment, setUserName, setIsEquipment, setFirstConnection } = useCombineStates();

  const [{ steps }, setState] = useState<State>({
    // run: false,
    steps: [
      //STEP #1
      {
        title: "Hi! I wanna ask you about...",
        content: <img style={{ width: "100px", height: "100px" }} src="./assets/icons/icon.png"></img>,
        placement: "center",
        target: "body",
      },
      //STEP #2
      {
        title: "...name. It's so important for me!",
        content: (
          <input
            type="text"
            placeholder="name"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></input>
        ),

        placement: "center",
        target: "body",
      },
      //STEP #3
      {
        title: "...equipment. Mark it, if you use it!",
        content: (
          <input className="intro_input" type="checkbox" onClick={setIsEquipment}></input>

          // <IonCheckbox
          //   className="tour__check_box"
          //   onIonChange={(e) => {
          //     e.preventDefault();
          //     setIsEquipment();
          //   }}
          // ></IonCheckbox>
        ),
        placement: "center",
        target: "body",
      },
      //STEP #4
      {
        title: "",
        content: "",

        placement: "center",
        target: "body",
      },
    ],
  });

  const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    // setState({ steps: [...steps], run: true });
  };
  function logGroup(type: string, data: any) {
    console.groupCollapsed(type);
    console.log(data);
    console.groupEnd();
  }

  const handleJoyrideCallback = (data: CallBackProps) => {
    if (data.index === 3) {
      data.step.title = (
        <div>
          <h1>
            Thanks <b>{userName}</b> for sharing!
          </h1>
          <h2>Now I give you a helper...</h2>

          <img src="/assets/icons/beacon_50x50.webp" alt="beacon"></img>
          <h2>...and let's start your training</h2>
        </div>
      );
    }
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setFirstConnection(false);
    }
    logGroup(type, data);
  };
  return (
    <Joyride
      run={firstConnection}
      debug
      continuous
      callback={handleJoyrideCallback}
      steps={steps}
      hideBackButton
      hideCloseButton
      scrollToFirstStep
      // showProgress
      styles={{
        options: {
          arrowColor: "#ffc409", //arrow
          backgroundColor: "#ffffff", //background for card
          overlayColor: "rgba(79, 26, 0, 0.4)", //background for App
          primaryColor: "#ffc409", //button
          textColor: "#000", //main text
          width: 900,
          zIndex: 1000,
        },
      }}
    />
  );
};

export default TourGuide;
