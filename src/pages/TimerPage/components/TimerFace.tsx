import React, { useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Duration } from "luxon";
import "./TimerFace.css";

interface IProps {
  workInterval: number;
  timerEnds: number;
  timerActive: boolean;
  resetTimer: () => void;
  key: number;
  reactivated: number;
  remainingTime: number;
  setRemainingTime: (value: number) => void;
}

const TimerFace: React.FC<IProps> = ({
  timerActive,
  workInterval,
  resetTimer,
  reactivated,
  remainingTime,
  setRemainingTime,
}) => {
  const secondsInOneMinute = 60;

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
      // key={reactivated}
      size={300}
      strokeWidth={22}
      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
      colorsTime={[7, 5, 2, 0]}
      rotation="clockwise"
      duration={workInterval * secondsInOneMinute}
      initialRemainingTime={remainingTime || workInterval * secondsInOneMinute}
      onComplete={() => {
        resetTimer();
        return { shouldRepeat: false, delay: 0 }; // repeat animation in 1.5 seconds
      }}
      onUpdate={setRemainingTime}
    >
      {() => renderTime(remainingTime, timerActive)}
    </CountdownCircleTimer>
  );
};

export default TimerFace;
