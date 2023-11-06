import React, { useEffect, useState } from "react";
import { CallBackProps, STATUS } from "react-joyride";

import "./index.css";
import GuideForTabTracksButton from "./components/GuideForTabTracksButton";
import GuideForInfoButton from "./components/GuideForInfoButton";
import GuideForNotification from "./components/GuideForNotification";
import GuideForSkipTimerSettings from "./components/GuideForSkipTimerSettings";
import GuideForStartButton from "./components/GuideForStartButton";
import { useCombineStates } from "../../store/useCombineStates";
import GuideForCheckBox from "./components/GuideForCheckBox";
import GuideForSelectionExercises from "./components/GuideForSelectionExercises";
import GuideForTabTrainingButton from "./components/GuideForTabTrainingButton";

// type Placement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';
interface IProps {
  path: string;
}

const TourGuide: React.FC<IProps> = ({ path }) => {
  const {
    stepsForBeacons,
    userTraining,
    selectedCategoryTracks,
    isNotification,
    introButtonsStatus,
    delayForShowingGuide,
    differenceInTimeForGuide,
    setInfoButtonStatus,
    setStepsForBeacons,
    checkedDateAfterRegistration,
  } = useCombineStates();

  //use states for activation Joyride
  const [activatedGuideForTabTracksButton, setActivatedGuideForTabTracksButton] = useState(false); //0
  const [activatedGuideForCheckbox, setActivatedGuideForCheckbox] = useState(false); //2
  const [activatedGuideForSelectionExercises, setActivatedGuideForSelectionExercises] = useState(false); //4
  const [activatedGuideForTabTrainingButton, setActivatedGuideForTabTrainingButton] = useState(false); //7
  const [activatedGuideForSkipTimerSettings, setActivatedGuideForSkipTimerSettings] = useState(false); //9
  const [activatedGuideForStartButton, setActivatedGuideForStartButton] = useState(false); //12
  const [activatedGuideForNotification, setActivatedGuideForNotification] = useState(false); //15

  // use for deferred Guide. Check it if time is over
  const [activatedGuideForInfoButton, setActivatedGuideForInfoButton] = useState(false);
  const changeStatusInfoButton = (value: boolean) => {
    setActivatedGuideForInfoButton(value);
    setInfoButtonStatus(value);
  };
  useEffect(() => {
    if (
      differenceInTimeForGuide > delayForShowingGuide &&
      userTraining.length &&
      introButtonsStatus.infoBtn &&
      !isNotification
    ) {
      setActivatedGuideForInfoButton(true);
    } else {
      checkedDateAfterRegistration();
    }
  }, []);

  // steps for JoyRide
  useEffect(() => {
    console.log("DONE DONE DONE");
    // for tracks button
    if (stepsForBeacons === 0) {
      setActivatedGuideForTabTracksButton(true);
    }
    // for checkbox
    if (stepsForBeacons == 2) {
      setActivatedGuideForCheckbox(true);
    }
    //for selection exercise
    if (stepsForBeacons == 4 && selectedCategoryTracks.length) {
      setActivatedGuideForSelectionExercises(true);
    }
    if (stepsForBeacons == 7 && userTraining.length) {
      setActivatedGuideForTabTrainingButton(true);
    }
    // for skip-time-settings
    if (stepsForBeacons === 9) {
      setActivatedGuideForSkipTimerSettings(true);
    }
    // for start workout
    if (stepsForBeacons === 12) {
      setActivatedGuideForStartButton(true);
    }
    // for notification
    if (stepsForBeacons === 15) {
      setActivatedGuideForNotification(true);
    }
  }, [path, stepsForBeacons, selectedCategoryTracks, userTraining]);

  function logGroup(type: string, data: any) {
    console.groupCollapsed(type);
    console.log(data);
    console.groupEnd();
  }

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      //action after tour
    }
    logGroup(type, data);
  };

  return (
    <>
      {path === "timer" && (
        <div>
          <GuideForTabTracksButton //0
            showBeacon={activatedGuideForTabTracksButton}
            setShowGuide={setActivatedGuideForTabTracksButton}
            setStepsForBeacons={setStepsForBeacons}
          />
          <GuideForSkipTimerSettings //9
            showBeacon={activatedGuideForSkipTimerSettings}
            setShowGuide={setActivatedGuideForInfoButton}
            setStepsForBeacons={setStepsForBeacons}
          />
          <GuideForStartButton //12
            showBeacon={activatedGuideForStartButton}
            setShowGuide={setActivatedGuideForStartButton}
            setStepsForBeacons={setStepsForBeacons}
          />
          <GuideForNotification //15
            showBeacon={activatedGuideForNotification}
            setShowGuide={setActivatedGuideForNotification}
            setStepsForBeacons={setStepsForBeacons}
          />
          <GuideForInfoButton //optional
            showBeacon={activatedGuideForInfoButton}
            setShowGuide={changeStatusInfoButton}
            setStepsForBeacons={setStepsForBeacons}
          />
        </div>
      )}
      ;
      {path === "tracks" && (
        <div>
          <GuideForCheckBox //2
            showBeacon={activatedGuideForCheckbox}
            setShowGuide={setActivatedGuideForCheckbox}
            setStepsForBeacons={setStepsForBeacons}
          />
          <GuideForSelectionExercises //4
            showBeacon={activatedGuideForSelectionExercises}
            setShowGuide={setActivatedGuideForSelectionExercises}
            setStepsForBeacons={setStepsForBeacons}
          />
          <GuideForTabTrainingButton //7
            showBeacon={activatedGuideForTabTrainingButton}
            setShowGuide={setActivatedGuideForTabTrainingButton}
            setStepsForBeacons={setStepsForBeacons}
          />
        </div>
      )}
    </>
  );
};

export default TourGuide;
