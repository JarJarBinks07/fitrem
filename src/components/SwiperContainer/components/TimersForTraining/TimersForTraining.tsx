import React from "react";
import ISwiper from "swiper";
import TimerFace from "../../../../pages/TimerPage/components/TimerFace";
import { useCombineStates } from "../../../../store/useCombineStates";

import "./TimersForTraining.css";

interface IProps {
  swiper: ISwiper;
  swiperTrackIndex: number;
  setPlayStatus: (value: boolean) => void;
}

const TimersForTraining: React.FC<IProps> = ({ swiper, swiperTrackIndex, setPlayStatus }) => {
  const {
    timerKeyForTraining,
    preparationTime,
    workIntervalForTraining,
    restIntervalForTraining,
    timeAfterPauseForTraining,
    timerDurationForTraining,
    timerStatusForTraining,
    timerMode,
    unsetTimerForTraining,
    setPassedExercises,
    setTimerMode,
  } = useCombineStates();

  return (
    <div className="swiper__timer">
      {timerMode === "preparation" && (
        <TimerFace
          timerKey={timerKeyForTraining}
          timerInterval={preparationTime}
          timerDuration={timeAfterPauseForTraining ? timeAfterPauseForTraining : timerDurationForTraining - Date.now()}
          timerActive={timerStatusForTraining === "start"}
          timerMode={timerMode}
          setTimerMode={setTimerMode}
          unsetTimer={unsetTimerForTraining}
          size={65}
          strokeWidth={4}
          colors={["#ffc409", "#ffc409"]}
          colorsTime={[15, 10]}
          timerFor={"working"}
          swiper={swiper}
          swiperTrackIndex={swiperTrackIndex}
          setPlayStatus={setPlayStatus}
          setPassedExercises={setPassedExercises}
        />
      )}
      {timerMode === "training" && (
        <TimerFace
          timerKey={timerKeyForTraining}
          timerInterval={workIntervalForTraining}
          timerDuration={timeAfterPauseForTraining ? timeAfterPauseForTraining : timerDurationForTraining - Date.now()}
          timerActive={timerStatusForTraining === "start"}
          timerMode={timerMode}
          setTimerMode={setTimerMode}
          unsetTimer={unsetTimerForTraining}
          size={65}
          strokeWidth={4}
          colors={["#eb445a", "#eb445a"]}
          colorsTime={[15, 10]}
          timerFor={"working"}
          swiper={swiper}
          swiperTrackIndex={swiperTrackIndex}
          setPlayStatus={setPlayStatus}
          setPassedExercises={setPassedExercises}
        />
      )}
      {timerMode === "rest" && (
        <TimerFace
          timerKey={timerKeyForTraining}
          timerInterval={restIntervalForTraining}
          timerDuration={timeAfterPauseForTraining ? timeAfterPauseForTraining : timerDurationForTraining - Date.now()}
          timerActive={timerStatusForTraining === "start"}
          timerMode={timerMode}
          setTimerMode={setTimerMode}
          size={65}
          strokeWidth={4}
          colors={["#2fc22d", "#2dc275"]}
          colorsTime={[15, 10]}
          timerFor={"working"}
          swiper={swiper}
          swiperTrackIndex={swiperTrackIndex}
          setPlayStatus={setPlayStatus}
          unsetTimer={unsetTimerForTraining}
          setPassedExercises={setPassedExercises}
        />
      )}
    </div>
  );
};

export default TimersForTraining;
