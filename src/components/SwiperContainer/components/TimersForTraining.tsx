import React from "react";
import ISwiper from "swiper";
import TimerFace from "../../../pages/TimerPage/components/TimerFace";
import { useCombineStates } from "../../../store/useCombineStates";

import "./TimersForTraining.css";

interface IProps {
  selectedTimer: "preparation" | "training" | "rest";
  swiper: ISwiper;
  changeStatus: () => void;
  setDisabledButtons: React.Dispatch<React.SetStateAction<boolean>>;
}

const TimersForTraining: React.FC<IProps> = ({ selectedTimer, swiper, changeStatus, setDisabledButtons }) => {
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
    <>
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
          setDisabledButtons={setDisabledButtons}
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
          setDisabledButtons={setDisabledButtons}
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
          setDisabledButtons={setDisabledButtons}
        />
      )}
    </>
  );
};

export default TimersForTraining;
