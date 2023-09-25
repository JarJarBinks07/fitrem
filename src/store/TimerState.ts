import { MyStateCreator, useCombineStates } from "./useCombineStates";

export interface ITimer {
  timerInterval: number;
  timerStatus: "idle" | "running" | "pause";
  timerKey: number;
  timerDuration: number;
  timerPausedTime: number;
  setTimerInterval: (value: number) => void;
  setTimerStatus: (value: "idle" | "running" | "pause") => void;
  setTimerKey: () => void;
  setTimerDuration: (value: number) => void;
  setTimerPausedTime: () => void;
  unsetTimer: () => void;
}

export const createTimerState: MyStateCreator<ITimer> = (set) => ({
  timerInterval: 25,
  setTimerInterval: (value) => set(() => ({ timerInterval: value }), false, "setTimerInterval"),

  timerStatus: "idle",
  setTimerStatus: (value) => set(() => ({ timerStatus: value }), false, "setTimerStatus"),

  timerKey: Date.now(),
  setTimerKey: () => set(() => ({ timerKey: Date.now() }), false, "setTimerKey"),

  timerDuration: 0,
  setTimerDuration: (value) => set(() => ({ timerDuration: Date.now() + value }), false, "setTimerDuration"),

  timerPausedTime: 0,
  setTimerPausedTime: () =>
    set((state) => ({ timerPausedTime: state.timerDuration - Date.now() }), false, "setTimerPausedTime"),

  unsetTimer: () =>
    set(
      () => ({ timerKey: Date.now(), timerStatus: "idle", timerDuration: 0, timerPausedTime: 0 }),
      false,
      "unsetTimer"
    ),
});
