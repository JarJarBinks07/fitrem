import React, { useEffect } from "react";
import ISwiper from "swiper";
import TimerFace from "../../../../pages/TimerPage/components/TimerFace";
import { useCombineStates } from "../../../../store/useCombineStates";

import "./TimersForTraining.css";
import _ from "lodash";

interface IProps {
  swiper: ISwiper;
  playAudio: () => Promise<void>;
  setPlayStatus: (value: boolean) => void;
  setIsOpenSwiperAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setDisabledGO: React.Dispatch<React.SetStateAction<boolean>>;
}

const TimersForTraining: React.FC<IProps> = ({ swiper, playAudio, setPlayStatus, setIsOpenSwiperAlert, setDisabledGO }) => {
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
    userTraining,
    setTimerMode,
    setTimeTrainingDuration,
    setDoneExercise,
    setTimerTrainingStatus,
    unsetTrainingTimer,
    unsetWhenDone,
  } = useCombineStates();

  const counterActiveTracks = Object.keys(_.groupBy(userTraining, "category")).length;
  const setSettings = (interval: number, mode: "preparation" | "training" | "rest", status: boolean) => {
    setTimeTrainingDuration(interval * 1000);
    setTimerMode(mode);
    setPlayStatus(status);
  };

  const setGo = () => {
    setTimeout(() => {
      setDisabledGO(true);
    });
    setTimeout(() => {
      setDisabledGO(false);
    }, 3000);
  };

  const onCompleteSession = () => {
    if (timerMode === "preparation") {
      playAudio();
      setGo();
      setSettings(workIntervalForTraining, "training", true);
      unsetTrainingTimer();
      return;
    }
    if (timerMode === "training") {
      if (swiperTrackIndex === counterActiveTracks - 1) {
        setTimerTrainingStatus("pause");
        setSettings(workIntervalForTraining, "training", false);
        setIsOpenSwiperAlert(true);
        setDoneExercise(swiperTrackIndex);
        unsetWhenDone();
        return;
      }
      setDoneExercise(swiperTrackIndex);
      setSettings(restIntervalForTraining, "rest", false);
      unsetTrainingTimer();
      return;
    }
    playAudio();
    setGo();
    setSettings(workIntervalForTraining, "training", true);
    unsetTrainingTimer();
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
          // unsetTimer={unsetTrainingTimer}
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
          // unsetTimer={unsetTrainingTimer}
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
          // unsetTimer={unsetTrainingTimer}
          onCompleteSession={onCompleteSession}
        />
      )}
    </div>
  );
};

export default TimersForTraining;
