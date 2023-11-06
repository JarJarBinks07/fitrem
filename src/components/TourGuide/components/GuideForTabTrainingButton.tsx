import React from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

import "../index.css";

// type Placement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';

interface IProps {
  showBeacon: boolean | undefined;
  setShowGuide: (value: boolean) => void;
  handleCallback: (data: CallBackProps, callback: (value: boolean) => void) => void;
}

const GuideForTabTrainingButton: React.FC<IProps> = ({ showBeacon, setShowGuide, handleCallback }) => {
  const stepForTabTrainingButton: Step[] = [
    // TAB TIMER
    {
      title: <p className="tour__tile">Now you created your own training</p>,
      content: (
        <div className="tab-button__container">
          <p className="tour__content tour__background">Your exercises'll be showing randomly</p>
          <p className="tour__content tour__background">During training you can do only one exercise from category</p>
          <p className="tour__content tour__background">You can do as much exercises as active category you chose</p>
          <p className="tour__content">Let's check it! Click on button</p>
        </div>
      ),

      placement: "top",
      target: "#timer-btn",
    },
  ];

  return (
    <div>
      <Joyride
        run={showBeacon}
        callback={(data) => handleCallback(data, setShowGuide)}
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
