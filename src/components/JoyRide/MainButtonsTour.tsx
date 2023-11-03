// import { useMount, useSetState } from "react-use";
import React from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { useCombineStates } from "../../store/useCombineStates";

import "./TourGuide.css";

// type Placement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';

const MainButtonsTour: React.FC = () => {
  const { mainButtonsTour, setMainButtonsTour } = useCombineStates();
  const stepsForMainButton: Step[] = [
    // START
    {
      title: "When you are ready! Click for start",
      content: (
        <div>
          <h2>
            <b>Now it's disabled! Just make your choice</b>
          </h2>
        </div>
      ),
      placement: "bottom",
      target: "#start-btn",
    },
    // SKIP
    {
      title: "Make your training more comfortable! ",
      content: (
        <div>
          <h2>Just click and change exercise from category</h2>
          <h2>
            <b>If exercise is only one it'll be disabled</b>
          </h2>
        </div>
      ),

      placement: "bottom",
      target: "#skip-btn",
    },
    // TRACK
    {
      title: "Here you can choose training",
      content: "",
      placement: "top",
      target: "#track-btn",
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
        continuous
        callback={handleJoyrideCallback}
        // steps={infoBtnTour ? stepForInfoBtn : stepForProfileBtn}
        steps={stepsForMainButton}
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

export default MainButtonsTour;
