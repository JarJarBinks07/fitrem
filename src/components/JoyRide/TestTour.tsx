// import { useMount, useSetState } from "react-use";
import React, { useEffect, useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

import "./TourGuide.css";
import { useCombineStates } from "../../store/useCombineStates";

interface State {
  run: boolean;
  steps: Step[];
}

// type Placement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';

const TestTour: React.FC = () => {
  const { mainButtonsTour, setMainButtonsTour } = useCombineStates();
  const stepForInfoBtn: Step[] = [
    {
      title: "Test INFO Button",
      content: "test...test...test",
      placement: "bottom",
      target: "#info-btn",
    },
  ];

  const stepForProfileBtn: Step[] = [
    {
      title: "Test PROFILE Button",
      content: "test...test...test",
      placement: "bottom",
      target: "#profile-btn",
    },
  ];
  const testtest: Step[] = [
    {
      title: "Test PROFILE Button",
      content: "test...test...test",
      placement: "bottom",
      target: "#settings-test",
    },
  ];

  function logGroup(type: string, data: any) {
    console.groupCollapsed(type);
    console.log(data);
    console.groupEnd();
  }

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setMainButtonsTour(false);
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
        // run={infoBtnTour || profileBtnTour}
        run={mainButtonsTour}
        debug
        // continuous
        callback={handleJoyrideCallback}
        // steps={infoBtnTour ? stepForInfoBtn : stepForProfileBtn}
        steps={testtest}
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
            // width: 900,
            zIndex: 1000,
          },
        }}
      />
    </div>
  );
};

export default TestTour;
