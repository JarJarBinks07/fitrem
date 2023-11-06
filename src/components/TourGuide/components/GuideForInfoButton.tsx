import React from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

import "../index.css";

// type Placement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';

interface IProps {
  showBeacon: boolean | undefined;
  setShowGuide: (value: boolean) => void;
  handleCallback: (data: CallBackProps, callback: (value: boolean) => void) => void;
}

const GuideForInfoButton: React.FC<IProps> = ({ showBeacon, setShowGuide, handleCallback }) => {
  const stepFoInfoButton: Step[] = [
    // INFO
    {
      title: <p className="tour__tile">Get description of Exercise</p>,
      content: <p className="tour__content">CLICK</p>,
      placement: "bottom",
      target: "#info-btn",
    },
  ];

  return (
    <div>
      <Joyride
        run={showBeacon}
        callback={(data) => handleCallback(data, setShowGuide)}
        steps={stepFoInfoButton}
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

export default GuideForInfoButton;
