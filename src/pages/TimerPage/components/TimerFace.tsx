import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Duration } from "luxon";
import "./TimerFace.css";
interface IProps {
  timerInterval: number;
  timerKey: number;
  timerDuration: number;
  timerActive: boolean;
  unsetTimer: () => void;
}

const TimerFace: React.FC<IProps> = ({ timerInterval, timerKey, timerDuration, timerActive, unsetTimer }) => {
  //secondsInOneMinute=60
  const secondsInOneMinute = 1;
  const timeLeft = !!timerDuration ? (timerDuration - Date.now()) / 1000 : timerInterval * secondsInOneMinute;

  const renderTime = (time: number, timerActive: boolean) => {
    const formattedTime = Duration.fromMillis(time * 1000).toFormat("mm:ss");

    return (
      <div className="time-wrapper">
        <div>{timerActive ? "NEXT BREAK IS IN" : "CLICK PLAY BUTTON"}</div>
        <div className="timer-digits">
          <div>{formattedTime}</div>
        </div>
      </div>
    );
  };

  return (
    <CountdownCircleTimer
      isPlaying={timerActive}
      key={timerKey}
      size={300}
      strokeWidth={22}
      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
      colorsTime={[7, 5, 2, 0]}
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
