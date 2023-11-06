import React from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

import "../index.css";

// type Placement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';

interface IProps {
  showBeacon: boolean | undefined;
  setShowGuide: (value: boolean) => void;
  handleCallback: (data: CallBackProps, callback: (value: boolean) => void) => void;
}

const GuideForNotification: React.FC<IProps> = ({ showBeacon, setShowGuide, handleCallback }) => {
  const stepForNotification: Step[] = [
    // NOTIFICATION
    {
      title: <p className="tour__tile">This is timer for notification</p>,
      content: (
        <div className="notification__container">
          <p className="tour__content tour__background">After current time you'll get notification for training</p>
          <p className="tour__content tour__background">It works even App'll be closed</p>
          <p className="tour__content tour__background">If you want to train earlier, you can click forward button</p>
        </div>
      ),
      placement: "bottom",
      target: "#notification",
    },
  ];

  return (
    <div>
      <Joyride
        run={showBeacon}
        callback={(data) => handleCallback(data, setShowGuide)}
        steps={stepForNotification}
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

export default GuideForNotification;
