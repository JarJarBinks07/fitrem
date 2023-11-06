import React from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

import "../index.css";

// type Placement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';

interface IProps {
  showBeacon: boolean | undefined;
  setShowGuide: (value: boolean) => void;
  handleCallback: (data: CallBackProps, callback: (value: boolean) => void) => void;
}

const GuideForSkipTimerSettings: React.FC<IProps> = ({ showBeacon, setShowGuide, handleCallback }) => {
  const stepsSkipTimerSettings: Step[] = [
    // SKIP
    {
      title: <p className="tour__tile">Make your training more comfortable!</p>,
      content: (
        <div>
          <p className="tour__content tour__background">Just click and replace exercise from category</p>
          <p className="tour__content tour__background">If exercise is only one, button'll be disabled</p>
        </div>
      ),
      placement: "bottom",
      target: "#skip-btn",
    },
    // TIMER
    {
      title: <p className="tour__tile">Timer has three modes:</p>,
      content: (
        <div>
          <div className="tour-timers__container">
            <div className="tour-timers__content">
              <img className="tour-timers__img" src="/assets/timers/timer-preparation.png" alt=""></img>
              <p className="tour-timers__subtile">Preparation</p>
            </div>
            <div className="tour-timers__content">
              <img className="tour-timers__img" src="/assets/timers/timer-training.png" alt=""></img>
              <p className="tour-timers__subtile">Training</p>
            </div>
            <div className="tour-timers__content">
              <img className="tour-timers__img" src="/assets/timers/timer-rest.png" alt=""></img>
              <p className="tour-timers__subtile"> Rest</p>
            </div>
          </div>
          <p className="tour-timers__last">
            You can change time in <b>Settings</b> for timer
          </p>
        </div>
      ),
      placement: "bottom",
      target: "#time-indicator",
    },
    //SETTINGS
    {
      title: <p className="tour__tile">Flexible time for:</p>,
      content: (
        <div className="tour-settings__container">
          <div className="tour-settings__content tour-settings__content_yellow">Notification</div>
          <div className="tour-settings__content tour-settings__content_red">Training</div>
          <div className="tour-settings__content tour-settings__content_green">Rest</div>
          <p className="tour-timers__last">
            Click and go to <b>Settings</b>
          </p>
        </div>
      ),
      placement: "bottom",
      target: "#settings-btn",
    },
  ];

  return (
    <div>
      <Joyride
        run={showBeacon}
        callback={(data) => handleCallback(data, setShowGuide)}
        steps={stepsSkipTimerSettings}
        debug // without using app gets error with global undefined
        continuous
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

export default GuideForSkipTimerSettings;
