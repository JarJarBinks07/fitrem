import { MyStateCreator } from "./useCombineStates";

export interface ITimer {
  timerConfiguration: number;
  timerStatus: "running" | "idle";
  remainingTime: number;
  setTimerConfiguration: (value: number) => void;
  startTimerHandler: () => void;
  setRemainingTime: (value: number) => void;
}

export const createTimerState: MyStateCreator<ITimer> = (set) => ({
  timerConfiguration: 25,
  setTimerConfiguration: (value) => set(() => ({ timerConfiguration: value })),

  timerStatus: "idle",
  startTimerHandler: () =>
    set((state) => ({ timerStatus: state.timerStatus === "idle" ? "running" : "idle" })),

  remainingTime: 0,
  setRemainingTime: (value) => set(() => ({ remainingTime: value })),
});
