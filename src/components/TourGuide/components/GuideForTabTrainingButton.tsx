import React from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

import "../index.css";

// type Placement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';

interface IProps {
  showBeacon: boolean | undefined;
  setShowGuide: (value: boolean) => void;
  setCounterBeacons: () => void;
}

const GuideForTabTrainingButton: React.FC<IProps> = ({ showBeacon, setShowGuide, setCounterBeacons }) => {
  const stepForTabTrainingButton: Step[] = [
    // TAB TIMER
    {
      title: <p className="tour__tile">Now you created your own training</p>,
      content: (
        <div className="tab-button__container">
          <p className="tab-button__content">Your exercises'll be showing randomly</p>
          <p className="tab-button__content">During training you can do only one exercise from category</p>
          <p className="tab-button__content">You can do as much exercises as active category you chose</p>
          <p className="tab-button__content">Let's check it! Click on button</p>
        </div>
      ),

      placement: "top",
      target: "#timer-btn",
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
      setShowGuide(false);
      setCounterBeacons();
    }
    logGroup(type, data);
  };

  return (
    <div>
      <Joyride
        run={showBeacon}
        callback={handleJoyrideCallback}
        steps={stepForTabTrainingButton}
        debug // without using app gets error with global undefined
        hideBackButton
        hideCloseButton
        scrollToFirstStep
        showProgress
        styles={{
          options: {
            arrowColor: "#ffc409", //arrow
            backgroundColor: "#ffffff", //background for card
            overlayColor: "rgba(79, 26, 0, 0.4)", //background for App
            primaryColor: "#2fc22d", //button
            textColor: "#000", //main text
            // width: 900,
            zIndex: 1000,
          },
        }}
      />
    </div>
  );
};

export default GuideForTabTrainingButton;
