import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Duration } from "luxon";
import "./TimerFace.css";
import { ColorFormat } from "@faker-js/faker";
import { useCombineStates } from "../../../store/useCombineStates";
import { useSwiper } from "swiper/react";
import Swiper from "swiper";

interface IProps {
  timerInterval: number;
  timerKey: number;
  timerDuration: number;
  timerActive: boolean;
  size: number;
  strokeWidth: number;
  mode: "rest" | "training";
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
  unsetTimer: () => void;
  swiper: Swiper;
  changeStatus: () => void;
  setDisabledButtons: (value: boolean) => void;
}

const TimerFace: React.FC<IProps> = ({
  swiper,
  timerInterval,
  timerKey,
  timerDuration,
  timerActive,
  size,
  strokeWidth,
  mode,
  colors,
  colorsTime,
  unsetTimer,

  changeStatus,
  setDisabledButtons,
}) => {
  const onCompleteSession = () => {
    unsetTimer();
    setDisabledButtons(false);
    changeStatus();
    swiper.slideNext();
  };
  // const { setCountDownFroTraining } = useCombineStates();
  /////for different timers/////
  let fromMinuteToSeconds = mode === "training" ? 1 : 60;
  const timeLeft = !!timerDuration ? timerDuration / 1000 : timerInterval * fromMinuteToSeconds;

  const renderTime = (time: number, timerActive: boolean) => {
    let formattedTime = null;
    if (mode === "rest") {
      formattedTime = Duration.fromMillis(time * 1000).toFormat("mm:ss");
    } else {
      formattedTime = Duration.fromMillis(time * 1000).toFormat("m:ss");
    }

    return (
      <>
        {mode === "rest" ? (
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
        // setNextSlide(true);
        // changeStatus();
        // setCountDownFroTraining();
      }}
    >
      {({ remainingTime }) => renderTime(remainingTime, timerActive)}
    </CountdownCircleTimer>
  );
};

export default TimerFace;
