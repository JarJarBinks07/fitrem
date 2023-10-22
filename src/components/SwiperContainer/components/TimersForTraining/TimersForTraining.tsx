import React from "react";
import ISwiper from "swiper";
import TimerFace from "../../../../pages/TimerPage/components/TimerFace";
import { useCombineStates } from "../../../../store/useCombineStates";

import "./TimersForTraining.css";

interface IProps {
  selectedTimer: "preparation" | "training" | "rest";
  swiper: ISwiper;
  changeStatus: () => void;
}

const TimersForTraining: React.FC<IProps> = ({ selectedTimer, swiper, changeStatus }) => {
  const {
    timerKeyForTraining,
    countDownForTraining,
    workIntervalForTraining,
    restIntervalForTraining,
    timeAfterPauseForTraining,
    timerDurationForTraining,
    timerStatusForTraining,
    unsetTimerForTraining,
  } = useCombineStates();

  return (
    <div className="swiper__timer">
      {selectedTimer === "preparation" && (
        <TimerFace
          timerKey={timerKeyForTraining}
          timerInterval={countDownForTraining}
          timerDuration={timeAfterPauseForTraining ? timeAfterPauseForTraining : timerDurationForTraining - Date.now()}
          timerActive={timerStatusForTraining === "running"}
          unsetTimer={unsetTimerForTraining}
          size={65}
          strokeWidth={4}
          colors={["#ffc409", "#ffc409"]}
          colorsTime={[15, 10]}
          mode={"training"}
          swiper={swiper}
          changeStatus={changeStatus}
        />
      )}
      {selectedTimer === "training" && (
        <TimerFace
          timerKey={timerKeyForTraining}
          timerInterval={workIntervalForTraining}
          timerDuration={timeAfterPauseForTraining ? timeAfterPauseForTraining : timerDurationForTraining - Date.now()}
          timerActive={timerStatusForTraining === "running"}
          unsetTimer={unsetTimerForTraining}
          size={65}
          strokeWidth={4}
          colors={["#eb445a", "#eb445a"]}
          colorsTime={[15, 10]}
          mode={"training"}
          swiper={swiper}
          changeStatus={changeStatus}
        />
      )}
      {selectedTimer === "rest" && (
        <TimerFace
          timerKey={timerKeyForTraining}
          timerInterval={restIntervalForTraining}
          timerDuration={timeAfterPauseForTraining ? timeAfterPauseForTraining : timerDurationForTraining - Date.now()}
          timerActive={timerStatusForTraining === "running"}
          size={65}
          strokeWidth={4}
          colors={["#2fc22d", "#2dc275"]}
          colorsTime={[15, 10]}
          mode={"training"}
          swiper={swiper}
          changeStatus={changeStatus}
          unsetTimer={unsetTimerForTraining}
        />
      )}
    </div>
  );
};

export default TimersForTraining;
