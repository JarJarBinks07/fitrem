import { MyStateCreator } from "./useCombineStates";

export interface ITimerNotification {
  timerNotificationInterval: number;
  timerNotificationStatus: "idle" | "running" | "pause";
  timerNotificationKey: number;
  timeNotificationDuration: number;
  timeNotificationAfterPause: number;
  setTimerNotificationInterval: (value: number) => void;
  setTimerNotificationStatus: (value: "idle" | "running" | "pause") => void;
  setTimerNotificationKey: () => void;
  setTimeNotificationDuration: (value: number) => void;
  setTimeNotificationAfterPause: () => void;
  unsetNotificationTimer: () => void;
}

export const createTimerStateForNotification: MyStateCreator<ITimerNotification> = (set) => ({
  timerNotificationInterval: 25,
  setTimerNotificationInterval: (value) => set(() => ({ timerNotificationInterval: value }), false, "setTimerInterval"),

  timerNotificationStatus: "idle",
  setTimerNotificationStatus: (value) => set(() => ({ timerNotificationStatus: value }), false, "setTimerStatus"),

  timerNotificationKey: Date.now(),
  setTimerNotificationKey: () => set(() => ({ timerNotificationKey: Date.now() }), false, "setTimerKey"),

  timeNotificationDuration: 0,
  setTimeNotificationDuration: (value) =>
    set(() => ({ timeNotificationDuration: Date.now() + value }), false, "setTimerDuration"),

  timeNotificationAfterPause: 0,
  setTimeNotificationAfterPause: () =>
    set(
      (state) => ({ timeNotificationAfterPause: state.timeNotificationDuration - Date.now() }),
      false,
      "setTimeAfterPause"
    ),

  unsetNotificationTimer: () =>
    set(
      () => ({
        timerNotificationKey: Date.now(),
        timerNotificationStatus: "idle",
        timeNotificationDuration: 0,
        timerPausedTime: 0,
      }),
      false,
      "unsetTimer"
    ),
});
