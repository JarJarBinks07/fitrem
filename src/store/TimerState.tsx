import { MyStateCreator } from "./useCombineStates";

export interface ITimer {
  timerInterval: number;
  timerStatus: "running" | "idle";
  remainingTime: number;
  timerReactivated: number;
  timerEnds: number;
  setTimerInterval: (value: number) => void;
  startTimerHandler: () => void;
  setRemainingTime: (value: number) => void;
  setTimerReactivated: () => void;
  setTimerEnds: () => void;
}

export const createTimerState: MyStateCreator<ITimer> = (set) => ({
  timerInterval: 25,
  setTimerInterval: (value) => set(() => ({ timerInterval: value })),

  timerStatus: "idle",
  startTimerHandler: () =>
    set((state) => ({ timerStatus: state.timerStatus === "idle" ? "running" : "idle" })),

  remainingTime: 0,
  setRemainingTime: (value) => set((state) => ({ remainingTime: value })),

  timerReactivated: 0,
  setTimerReactivated: () => set(() => ({ timerReactivated: Date.now() })),

  timerEnds: 0,
  setTimerEnds: () => set((state) => ({ timerEnds: Date.now() + state.timerInterval * 1000 })),
});
