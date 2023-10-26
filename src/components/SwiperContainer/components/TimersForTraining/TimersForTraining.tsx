import React from "react";
import ISwiper from "swiper";
import TimerFace from "../../../../pages/TimerPage/components/TimerFace";
import { useCombineStates } from "../../../../store/useCombineStates";

import "./TimersForTraining.css";

interface IProps {
  swiper: ISwiper;
  setPlayStatus: (value: boolean) => void;
}

const TimersForTraining: React.FC<IProps> = ({ swiper, setPlayStatus }) => {
  const {
    timerTrainingKey: timerKeyForTraining,
    preparationTime,
    timerTrainingInterval: workIntervalForTraining,
    timerRestInterval: restIntervalForTraining,
    timeTrainingAfterPause: timeAfterPauseForTraining,
    timeTrainingDuration: timerDurationForTraining,
    timerTrainingStatus: timerStatusForTraining,
    timerMode,
    swiperTrackIndex,
    unsetTrainingTimer,
    setPassedExercises,
    setTimerMode,
    setTimeTrainingDuration,
  } = useCombineStates();

  const setSettings = (interval: number, mode: "preparation" | "training" | "rest", status: boolean) => {
    setTimeTrainingDuration(interval * 1000);
    setTimerMode(mode);
    setPlayStatus(status);
  };

  const onCompleteSession = () => {
    if (timerMode === "preparation") {
      setSettings(workIntervalForTraining, "training", true);
    } else if (timerMode === "training") {
      setTimeout(() => {
        setPassedExercises(swiperTrackIndex, "done");
      }, 800);
      swiper.slideNext();
      setSettings(restIntervalForTraining, "rest", false);
    } else {
      setSettings(workIntervalForTraining, "training", true);
    }
  };

  return (
    <div className="swiper__timer">
      {timerMode === "preparation" && (
        <TimerFace
          timerKey={timerKeyForTraining}
          timerInterval={preparationTime}
          timerDuration={timeAfterPauseForTraining ? timeAfterPauseForTraining : timerDurationForTraining - Date.now()}
          timerActive={timerStatusForTraining === "start"}
          timerMode={timerMode}
          unsetTimer={unsetTrainingTimer}
          size={65}
          strokeWidth={4}
          colors={["#ffc409", "#ffc409"]}
          colorsTime={[15, 10]}
          timerFor={"exercise"}
          swiper={swiper}
          onCompleteSession={onCompleteSession}
        />
      )}
      {timerMode === "training" && (
        <TimerFace
          timerKey={timerKeyForTraining}
          timerInterval={workIntervalForTraining}
          timerDuration={timeAfterPauseForTraining ? timeAfterPauseForTraining : timerDurationForTraining - Date.now()}
          timerActive={timerStatusForTraining === "start"}
          timerMode={timerMode}
          unsetTimer={unsetTrainingTimer}
          size={65}
          strokeWidth={4}
          colors={["#eb445a", "#eb445a"]}
          colorsTime={[15, 10]}
          timerFor={"exercise"}
          swiper={swiper}
          onCompleteSession={onCompleteSession}
        />
      )}
      {timerMode === "rest" && (
        <TimerFace
          timerKey={timerKeyForTraining}
          timerInterval={restIntervalForTraining}
          timerDuration={timeAfterPauseForTraining ? timeAfterPauseForTraining : timerDurationForTraining - Date.now()}
          timerActive={timerStatusForTraining === "start"}
          timerMode={timerMode}
          size={65}
          strokeWidth={4}
          colors={["#2fc22d", "#2dc275"]}
          colorsTime={[15, 10]}
          timerFor={"exercise"}
          swiper={swiper}
          unsetTimer={unsetTrainingTimer}
          onCompleteSession={onCompleteSession}
        />
      )}
    </div>
  );
};

export default TimersForTraining;
