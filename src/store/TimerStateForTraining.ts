import { MyStateCreator, useCombineStates } from "./useCombineStates";

export interface ITimerTraining {
  countDownForTraining: number;
  workIntervalForTraining: number;
  savedWorkIntervalForTraining: number;
  restIntervalForTraining: number;
  savedRestIntervalForTraining: number;
  timerStatusForTraining: "idle" | "running" | "pause";
  timerKeyForTraining: number;
  timerDurationForTraining: number;
  timeAfterPauseForTraining: number;
  setCountDownFroTraining: () => void;
  setWorkIntervalForTraining: (value: number) => void;
  setRestIntervalForTraining: (value: number) => void;
  setTimerStatusForTraining: (value: "idle" | "running" | "pause") => void;
  setTimerKeyForTraining: () => void;
  setTimerDurationForTraining: (value: number) => void;
  setTimeAfterPauseForTraining: () => void;
  unsetTimerForTraining: () => void;
}

export const createTimerStateForTraining: MyStateCreator<ITimerTraining> = (set) => ({
  countDownForTraining: 10,
  setCountDownFroTraining: () => set(() => ({ countDownForTraining: 0 ? 10 : 0 }), false, "setCountDownFroTraining"),

  workIntervalForTraining: 45,
  savedWorkIntervalForTraining: 45,
  setWorkIntervalForTraining: (value) =>
    set(
      () => ({ workIntervalForTraining: value, savedWorkIntervalForTraining: value }),
      false,
      "setWorkIntervalForTraining"
    ),

  restIntervalForTraining: 30,
  savedRestIntervalForTraining: 30,
  setRestIntervalForTraining: (value) =>
    set(
      () => ({ restIntervalForTraining: value, savedRestIntervalForTraining: value }),
      false,
      "setRestIntervalForTraining"
    ),

  timerStatusForTraining: "idle",
  setTimerStatusForTraining: (value) =>
    set(() => ({ timerStatusForTraining: value }), false, "setTimerStatusForTraining"),

  timerKeyForTraining: Date.now(),
  setTimerKeyForTraining: () => set(() => ({ timerKeyForTraining: Date.now() }), false, "setTimerKeyForTraining"),

  timerDurationForTraining: 0,
  setTimerDurationForTraining: (value) =>
    set(() => ({ timerDurationForTraining: Date.now() + value }), false, "setTimerDurationForTraining"),

  timeAfterPauseForTraining: 0,
  setTimeAfterPauseForTraining: () =>
    set(
      (state) => ({ timeAfterPauseForTraining: state.timerDurationForTraining - Date.now() }),
      false,
      "setTimerAfterPauseForTraining"
    ),

  unsetTimerForTraining: () =>
    set(
      (state) => {
        if (state.countDownForTraining !== 0) {
          return {
            countDownForTraining: 0,
            timerKeyForTraining: Date.now(),
            // timerStatusForTraining: "idle",
            timerDurationForTraining: 0,
            timeAfterPauseForTraining: 0,
          };
        } else if (state.workIntervalForTraining !== 0) {
          return {
            workIntervalForTraining: 0,
            timerKeyForTraining: Date.now(),
            // timerStatusForTraining: "idle",
            timerDurationForTraining: 0,
            timeAfterPauseForTraining: 0,
          };
        } else if (state.countDownForTraining === 0 && state.workIntervalForTraining === 0) {
          return {
            workIntervalForTraining: state.savedWorkIntervalForTraining,
            timerKeyForTraining: Date.now(),
            timerDurationForTraining: 0,
            timeAfterPauseForTraining: 0,
          };
        } else return state;
      },
      false,
      "unsetTimerForTraining"
    ),
});
