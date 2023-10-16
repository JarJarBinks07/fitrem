import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Duration } from "luxon";
import "./TimerFace.css";
import { ColorFormat } from "@faker-js/faker";

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
}

const TimerFace: React.FC<IProps> = ({
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
}) => {
  //secondsInOneMinute=60
  const secondsInOneMinute = 1;
  const timeLeft = !!timerDuration ? (timerDuration - Date.now()) / 1000 : timerInterval * secondsInOneMinute;

  const renderTime = (time: number, timerActive: boolean) => {
    const formattedTime = Duration.fromMillis(time * 1000).toFormat("mm:ss");
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
      duration={timerInterval * secondsInOneMinute}
      initialRemainingTime={timeLeft > 0 ? timeLeft : timerInterval * secondsInOneMinute}
      onComplete={() => {
        unsetTimer();
      }}
    >
      {({ remainingTime }) => renderTime(remainingTime, timerActive)}
    </CountdownCircleTimer>
  );
};

export default TimerFace;
