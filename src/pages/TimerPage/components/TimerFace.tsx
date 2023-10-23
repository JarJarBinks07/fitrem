import React, { useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Duration } from "luxon";
import "./TimerFace.css";
import Swiper from "swiper";
import { useCombineStates } from "../../../store/useCombineStates";

interface IProps {
  timerKey: number;
  timerInterval: number;
  timerDuration: number;
  timerActive: boolean;
  timerMode: "preparation" | "training" | "rest";
  size: number;
  strokeWidth: number;
  colors: {
    0: `#${string}`;
  } & {
    1: `#${string}`;
  } & `#${string}`[];
  colorsTime: {
    0: number;
  } & {
    1: number;
  } & number[];
  swiper: Swiper;
  swiperTrackIndex: number;
  timerFor: "working" | "notification";
  unsetTimer: () => void;
  setChangedModeWithStatus: () => void;
  setTimerMode: (value: "preparation" | "training" | "rest") => void;
  setPassedExercises: (value: number, status: "done" | "skipped") => void;
}

const TimerFace: React.FC<IProps> = ({
  swiper,
  timerInterval,
  timerKey,
  timerDuration,
  timerActive,
  size,
  strokeWidth,
  timerMode,
  timerFor,
  colors,
  colorsTime,
  swiperTrackIndex,
  unsetTimer,
  setChangedModeWithStatus,
  setTimerMode,
  setPassedExercises,
}) => {
  const onCompleteSession = () => {
    if (timerMode === "preparation") {
      setTimerMode("training");
    } else if (timerMode === "training") {
      setPassedExercises(swiperTrackIndex, "done");
      setTimerMode("rest");
      swiper.slideNext();
    } else {
      setTimerMode("training");
    }
    setChangedModeWithStatus();
    unsetTimer();
  };

  //////////

  /////for different timers/////
  let fromMinuteToSeconds = timerFor === "working" ? 1 : 60;
  const timeLeft = timerDuration > 0 ? timerDuration / 1000 : timerInterval * fromMinuteToSeconds;

  console.log("Time from Timer Face: ", timerDuration);
  console.log("timeLeft: ", timeLeft);

  const renderTime = (time: number, timerActive: boolean) => {
    let formattedTime = null;
    if (timerFor === "notification") {
      formattedTime = Duration.fromMillis(time * 1000).toFormat("mm:ss");
    } else {
      formattedTime = Duration.fromMillis(time * 1000).toFormat("m:ss");
    }

    return (
      <>
        {timerFor === "notification" ? (
          <div className="time-wrapper">
            <div>{timerActive ? "NEXT BREAK IS IN" : "CLICK PLAY BUTTON"}</div>
            <div className="timer__digits_training">
              <div>{formattedTime}</div>
            </div>
          </div>
        ) : (
          <div className="time-wrapper">
            <div className="timer__digits_rest">
              <div>{formattedTime}</div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <CountdownCircleTimer
      isPlaying={timerActive}
      key={timerKey}
      size={size}
      strokeWidth={strokeWidth}
      colors={colors}
      colorsTime={colorsTime}
      rotation="clockwise"
      duration={timerInterval * fromMinuteToSeconds}
      initialRemainingTime={timeLeft > 0 ? timeLeft : timerInterval * fromMinuteToSeconds}
      onComplete={() => {
        onCompleteSession();
      }}
    >
      {({ remainingTime }) => renderTime(remainingTime, timerActive)}
    </CountdownCircleTimer>
  );
};

export default TimerFace;
