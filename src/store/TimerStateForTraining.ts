import { MyStateCreator, useCombineStates } from "./useCombineStates";

export interface ITimerTraining {
  countDownForTraining: number;
  workIntervalForTraining: number;
  restIntervalForTraining: number;
  timerStatusForTraining: "idle" | "running" | "pause";
  timerKeyForTraining: number;
  timerDurationForTraining: number;
  timerPauseForTraining: number;
  setWorkIntervalForTraining: (value: number) => void;
  setRestIntervalForTraining: (value: number) => void;
  setTimerStatusForTraining: (value: "idle" | "running" | "pause") => void;
  setTimerKeyForTraining: () => void;
  setTimerDurationForTraining: (value: number) => void;
  setTimerPauseForTraining: () => void;
  unsetTimerForTraining: () => void;
}

export const createTimerStateForTraining: MyStateCreator<ITimerTraining> = (set) => ({
  countDownForTraining: 10,

  workIntervalForTraining: 45,
  setWorkIntervalForTraining: (value) =>
    set(() => ({ workIntervalForTraining: value }), false, "setWorkIntervalForTraining"),

  restIntervalForTraining: 30,
  setRestIntervalForTraining: (value) =>
    set(() => ({ restIntervalForTraining: value }), false, "setRestIntervalForTraining"),

  timerStatusForTraining: "idle",
  setTimerStatusForTraining: (value) =>
    set(() => ({ timerStatusForTraining: value }), false, "setTimerStatusForTraining"),

  timerKeyForTraining: Date.now(),
  setTimerKeyForTraining: () => set(() => ({ timerKeyForTraining: Date.now() }), false, "setTimerKeyForTraining"),

  timerDurationForTraining: 0,
  setTimerDurationForTraining: (value) =>
    set(() => ({ timerDurationForTraining: Date.now() + value }), false, "setTimerDurationForTraining"),

  timerPauseForTraining: 0,
  setTimerPauseForTraining: () =>
    set(
      (state) => ({ timerPauseForTraining: state.timerDurationForTraining - Date.now() }),
      false,
      "setTimerPauseForTraining"
    ),

  unsetTimerForTraining: () =>
    set(
      () => ({
        timerKeyForTraining: Date.now(),
        timerStatusForTraining: "idle",
        timerDurationForTraining: 0,
        timerPauseForTraining: 0,
      }),
      false,
      "unsetTimerForTraining"
    ),
});
