import { IonButton, IonCheckbox, IonInput, IonText, IonTextarea, IonTitle } from "@ionic/react";
// import { useMount, useSetState } from "react-use";
import React, { useState } from "react";
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
  const [name, setName] = useState("");

  console.log("USER NAME ZUSTAND", userName);
  console.log("USER NAME LOCAL", name);
  console.log("EQUIPMENT", isEquipment);

  const [{ steps }, setState] = useState<State>({
    // run: false,
    steps: [
      //STEP #1
      {
        title: "Let's begin our journey",
        content: <img style={{ width: "100px", height: "100px" }} src="./assets/icons/icon.png"></img>,
        placement: "center",
        target: "body",
      },
      //STEP #2
      {
        title: " Please share your name",
        content: (
          // <IonInput
          //   fill="outline"
          //   placeholder="name"
          //   onIonChange={(e) => setName(e.detail.value as string)}
          // onIonChange={(e) => setUserName(e.detail.value as string)}
          // ></IonInput>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        ),

        placement: "center",
        target: "body",
      },
      //STEP #3
      {
        title: `Do you have any equipment for training`,
        content: (
          <input style={{ width: "32px", height: "32px" }} type="checkbox" onClick={setIsEquipment}></input>

          // <IonCheckbox
          //   className="tour__check_box"
          //   checked={test}
          //   onIonChange={(e) => {
          //     console.log(e.detail.value);
          //     setEquipment();
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
      //STEP #5
      {
        title: "Let's start our training",
        content: <img style={{ width: "100px", height: "100px" }} src="/assets/icons/bicep_image.png"></img>,
        placement: "center",
        target: "body",
      },
    ],
  });

  const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setState({ steps: [...steps], run: true });
  };
  function logGroup(type: string, data: any) {
    console.groupCollapsed(type);
    console.log(data);
    console.groupEnd();
  }

  const handleJoyrideCallback = (data: CallBackProps) => {
    if (data.index === 2 && name.length) {
      setUserName(name);
    }
    if (data.index === 3) {
      if (!isEquipment) {
        data.step.title = `Ok, ${userName}. We almost finish!`;
        data.step.content = "I wanna give you advise. If you buy additional equipment, you'll have more...";
      } else {
        data.step.title = `Ok, ${userName}. We almost finish!`;
      }
    }
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setFirstConnection(false);
    }
    logGroup(type, data);
  };
  return (
    <div
      style={{
        background: "#f1f1f1",
        height: "100%",
        display: "flex",
        gap: "10px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Joyride
        run={firstConnection}
        debug
        continuous
        callback={handleJoyrideCallback}
        steps={steps}
        hideBackButton
        hideCloseButton
        scrollToFirstStep
        showProgress
        styles={{
          options: {
            arrowColor: "#ffc409", //arrow
            backgroundColor: "#ffffff", //background for card
            overlayColor: "rgba(79, 26, 0, 0.4)", //background for App
            primaryColor: "#ffc409", //button
            textColor: "#000", //main text
            // width: 900,
            zIndex: 1000,
          },
        }}
      />
    </div>
  );
};

export default TourGuide;
