import React from "react";
import ISwiper from "swiper";
import TimerFace from "../../../../pages/TimerPage/components/TimerFace";
import { useCombineStates } from "../../../../store/useCombineStates";
import _ from "lodash";

import "./TimersForTraining.css";

interface IProps {
  swiper: ISwiper;
  playAudio: () => Promise<void>;
  setPlayStatus: (value: boolean) => void;
  setDisabledGO: React.Dispatch<React.SetStateAction<boolean>>;
  setSettings: (interval: number, mode: "preparation" | "training" | "rest", status: boolean) => void;
}

const TimersForTraining: React.FC<IProps> = ({ swiper, playAudio, setPlayStatus, setDisabledGO, setSettings }) => {
  const {
    timerTrainingKey,
    preparationTime,
    timerTrainingInterval,
    timerRestInterval,
    timeTrainingAfterPause,
    timeTrainingDuration,
    timerTrainingStatus,
    timerMode,
    swiperTrackIndex,
    userTraining,
    setDoneExercise,
    setTimerTrainingStatus,
    unsetTrainingTimer,
    setIsOpenSwiperAlert,
    unsetWhenDone,
  } = useCombineStates();

  const counterActiveTracks = Object.keys(_.groupBy(userTraining, "category")).length;

  const setGo = () => {
    setTimeout(() => {
      setDisabledGO(true);
    }, 500);
    setTimeout(() => {
      setDisabledGO(false);
    }, 3000);
  };

  const onCompleteSession = () => {
    if (timerMode === "preparation") {
      playAudio();
      setGo();
      setSettings(timerTrainingInterval, "training", true);
      unsetTrainingTimer();
      return;
    }
    if (timerMode === "training") {
      if (swiperTrackIndex === counterActiveTracks - 1) {
        setTimerTrainingStatus("pause");
        setSettings(timerTrainingInterval, "training", false);
        setIsOpenSwiperAlert(true);
        setDoneExercise(swiperTrackIndex);
        unsetWhenDone();
        return;
      }
      setDoneExercise(swiperTrackIndex);
      setSettings(timerRestInterval, "rest", false);
      unsetTrainingTimer();
      return;
    }
    playAudio();
    setGo();
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
