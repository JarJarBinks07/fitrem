import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
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
  console.log(remainingTime);
  const secondsInOneMinute = 60;
  const renderTime = (time: number, timerActive: boolean) => {
    const minutes = Math.floor(time / secondsInOneMinute);
    const seconds = Math.floor(time % secondsInOneMinute);

    let timeString: string = "";

    timeString = minutes < 10 ? "0" + minutes : `${minutes}`;
    timeString += seconds < 10 ? "0" + seconds : `${seconds}`;

    const digits: string[] = timeString.split("");

    return (
      <div className="time-wrapper">
        <div>{timerActive ? "NEXT BREAK IS IN" : "CLICK PLAY BUTTON"}</div>
        <div className="timer-digits">
          <div className="timer-digits__digit">{digits[0]}</div>
          <div className="timer-digits__digit">{digits[1]}</div>
          <div className="timer-digits__colon">:</div>
          <div className="timer-digits__digit">{digits[2]}</div>
          <div className="timer-digits__digit">{digits[3]}</div>
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
      {({ remainingTime }) => renderTime(remainingTime, timerActive)}
    </CountdownCircleTimer>
  );
};

export default TimerFace;
