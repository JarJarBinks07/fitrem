import React from "react";
import TimerFace from "../../../../pages/TimerPage/components/TimerFace";
import { useCombineStates } from "../../../../store/useCombineStates";
import _ from "lodash";

import "./TimersForTraining.css";

interface IProps {
  playAudio: () => Promise<void>;
  executorDoneExercise: () => void;
  setDisabledGO: React.Dispatch<React.SetStateAction<boolean>>;
  setSettings: (interval: number, mode: "preparation" | "training" | "rest", status: boolean) => void;
}

const TimersForTraining: React.FC<IProps> = ({ playAudio, executorDoneExercise, setDisabledGO, setSettings }) => {
  const {
    timerTrainingKey,
    preparationTime,
    timerTrainingInterval,
    timerRestInterval,
    timeTrainingAfterPause,
    timeTrainingDuration,
    timerTrainingStatus,
    timerMode,
    unsetTrainingTimer,
  } = useCombineStates();

  const setGO = () => {
    setTimeout(() => {
      setDisabledGO(true);
    }, 500);
    setTimeout(() => {
      setDisabledGO(false);
    }, 3000);
  };

  const onCompleteSession = () => {
    if (timerMode === "training") {
      executorDoneExercise();
      return;
    }
    playAudio();
    setGO();
    setSettings(timerTrainingInterval, "training", true);
    unsetTrainingTimer();
  };

  return (
    <div className="swiper__timer">
      {timerMode === "preparation" && (
        <TimerFace
          size={65}
          strokeWidth={4}
          colors={["#ffc409", "#ffc409"]}
          colorsTime={[15, 10]}
          timerFor={"exercise"}
          timerKey={timerTrainingKey}
          timerInterval={preparationTime}
          timerDuration={timeTrainingAfterPause ? timeTrainingAfterPause : timeTrainingDuration - Date.now()}
          timerActive={timerTrainingStatus === "start"}
          onComplete={onCompleteSession}
        />
      )}
      {timerMode === "training" && (
        <TimerFace
          size={65}
          strokeWidth={4}
          colors={["#eb445a", "#eb445a"]}
          colorsTime={[15, 10]}
          timerFor={"exercise"}
          timerKey={timerTrainingKey}
          timerInterval={timerTrainingInterval}
          timerDuration={timeTrainingAfterPause ? timeTrainingAfterPause : timeTrainingDuration - Date.now()}
          timerActive={timerTrainingStatus === "start"}
          onComplete={onCompleteSession}
        />
      )}
      {timerMode === "rest" && (
        <TimerFace
          size={65}
          strokeWidth={4}
          colors={["#2fc22d", "#2dc275"]}
          colorsTime={[15, 10]}
          timerFor={"exercise"}
          timerKey={timerTrainingKey}
          timerInterval={timerRestInterval}
          timerDuration={timeTrainingAfterPause ? timeTrainingAfterPause : timeTrainingDuration - Date.now()}
          timerActive={timerTrainingStatus === "start"}
          onComplete={onCompleteSession}
        />
      )}
    </div>
  );
};

export default TimersForTraining;
