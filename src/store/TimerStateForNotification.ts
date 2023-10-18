import { MyStateCreator } from "./useCombineStates";

export interface ITimerNotification {
  timerInterval: number;
  timerStatus: "idle" | "running" | "pause";
  timerKey: number;
  timerDuration: number;
  timeAfterPause: number;
  setTimerInterval: (value: number) => void;
  setTimerStatus: (value: "idle" | "running" | "pause") => void;
  setTimerKey: () => void;
  setTimerDuration: (value: number) => void;
  setTimeAfterPause: () => void;
  unsetTimer: () => void;
}

export const createTimerStateForNotification: MyStateCreator<ITimerNotification> = (set) => ({
  timerInterval: 25,
  setTimerInterval: (value) => set(() => ({ timerInterval: value }), false, "setTimerInterval"),

  timerStatus: "idle",
  setTimerStatus: (value) => set(() => ({ timerStatus: value }), false, "setTimerStatus"),

  timerKey: Date.now(),
  setTimerKey: () => set(() => ({ timerKey: Date.now() }), false, "setTimerKey"),

  timerDuration: 0,
  setTimerDuration: (value) => set(() => ({ timerDuration: Date.now() + value }), false, "setTimerDuration"),

  timeAfterPause: 0,
  setTimeAfterPause: () =>
    set((state) => ({ timeAfterPause: state.timerDuration - Date.now() }), false, "setTimeAfterPause"),

  unsetTimer: () =>
    set(
      () => ({ timerKey: Date.now(), timerStatus: "idle", timerDuration: 0, timerPausedTime: 0 }),
      false,
      "unsetTimer"
    ),
});
