import { IonButton, IonInput, IonTextarea } from "@ionic/react";
// import { useMount, useSetState } from "react-use";
import React, { useEffect, useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import Floater from "react-floater";
import { useCombineStates } from "../../store/useCombineStates";
import { checkbox, play } from "ionicons/icons";

import "./index.css";
import { NativeAudio } from "@capacitor-community/native-audio";

interface State {
  run: boolean;
  steps: Step[];
}

// type Placement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';

const TourGuide: React.FC = () => {
  const playAudio = async () => {
    await NativeAudio.play({
      assetId: "countdown",
    });
  };

  playAudio();
  const { userName, setUserName } = useCombineStates();
  const [name, setName] = useState("");

  console.log("USER NAME ZUSTAND", userName);
  console.log("USER NAME LOCAL", name);

  const [{ run, steps }, setState] = useState<State>({
    run: false,
    steps: [
      //STEP #0 BODY
      {
        title: "Let's begin our journey",
        content: <h2 style={{ color: "green" }}>Give me some info</h2>,
        // locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
        placement: "center",
        target: "body",
      },
      //STEP #1
      {
        title: " Write your name",
        content: (
          <IonInput
            //   label="name"
            // labelPlacement="fixed"
            // clearOnEdit={true}
            fill="outline"
            placeholder="write here"
            onIonChange={(e) => setName(e.detail.value as string)}
            // onIonChange={(e) => setUserName(e.detail.value as string)}
          ></IonInput>
          // <input
          //   style={{ color: "green" }}
          //   type="text"
          //   placeholder="name"
          //   onChange={(e) => {
          //     setUserName(e.target.value);
          //   }}
          // ></input>
        ),

        target: "body",
        placement: "bottom",
        floaterProps: {
          disableAnimation: true,
        },
        spotlightPadding: 20,
      },
      //STEP #2
      {
        title: "Step2",
        content: "",
        target: "body",
        placement: "bottom",
        // styles: {
        //   options: {
        //     width: 300,
        //   },
        // },
      },
      //STEP #3
      {
        title: "Do you have any equipment for training Step3",
        content: "",
        target: "#step3",
        placement: "top",
      },
      //STEP #4
      {
        content: "Fourth step",
        target: "#step4",
        placement: "center",
      },
      //STEP #5
      {
        content: (
          <div>
            <h3>All about us</h3>
            <input placeholder="hello"></input>
            <svg
              height="50px"
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 96 96"
              width="50px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M83.2922435,72.3864207 C69.5357835,69.2103145 56.7313553,66.4262214 62.9315626,54.7138297 C81.812194,19.0646376 67.93573,0 48.0030634,0 C27.6743835,0 14.1459311,19.796662 33.0745641,54.7138297 C39.4627778,66.4942237 26.1743334,69.2783168 12.7138832,72.3864207 C0.421472164,75.2265157 -0.0385432192,81.3307198 0.0014581185,92.0030767 L0.0174586536,96.0032105 L95.9806678,96.0032105 L95.9966684,92.1270809 C96.04467,81.3747213 95.628656,75.2385161 83.2922435,72.3864207 Z"
                  fill="#000000"
                />
              </g>
            </svg>
          </div>
        ),
        target: "#step5",
        placement: "bottom",
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
    if (data.index === 2) {
      // data.step.content = userName;
      // data.step.content = name;
      setUserName(name);
    }
    if (data.index === 3) {
      // data.step.content = userName;
      data.step.content = name;
    }

    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setState({ steps: [...steps], run: false });
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
      <IonButton expand="full" onClick={handleClickStart}>
        START
      </IonButton>
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          id={`step${item}`}
          style={{
            background: "green",
            width: "100px",
            height: "100px",
            display: "flex",
            border: "1px solid black",
            borderRadius: "4px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {item}
        </div>
      ))}
      <Joyride
        run={run}
        debug
        continuous
        callback={handleJoyrideCallback}
        steps={steps}
        hideCloseButton
        scrollToFirstStep
        // showSkipButton
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
