import { MyStateCreator } from "./useCombineStates";

export interface INotification {
  isNotification: boolean;
  timerNotificationInterval: number;
  timerNotificationStatus: "idle" | "running" | "pause";
  timerNotificationKey: number;
  timeNotificationDuration: number;
  timeNotificationAfterPause: number;
  setIsNotification: (value: boolean) => void;
  setTimerNotificationInterval: (value: number) => void;
  setTimerNotificationStatus: (value: "idle" | "running" | "pause") => void;
  setTimerNotificationKey: () => void;
  setTimeNotificationDuration: (value: number) => void;
  setTimeNotificationAfterPause: () => void;
  unsetNotificationTimer: () => void;
}

export const createNotificationState: MyStateCreator<INotification> = (set) => ({
  isNotification: false,
  setIsNotification: (value) => set(() => ({ isNotification: value }), false, "setNotificationStatus"),

  timerNotificationInterval: 25,
  setTimerNotificationInterval: (value) =>
    set(() => ({ timerNotificationInterval: value }), false, "setTimerNotificationInterval"),

  timerNotificationStatus: "idle",
  setTimerNotificationStatus: (value) =>
    set(() => ({ timerNotificationStatus: value }), false, "setTimerNotificationStatus"),

  timerNotificationKey: Date.now(),
  setTimerNotificationKey: () => set(() => ({ timerNotificationKey: Date.now() }), false, "setTimerNotificationKey"),

  timeNotificationDuration: 0,
  setTimeNotificationDuration: (value) =>
    set(() => ({ timeNotificationDuration: Date.now() + value }), false, "setTimeNotificationDuration"),

  timeNotificationAfterPause: 0,
  setTimeNotificationAfterPause: () =>
    set(
      (state) => ({ timeNotificationAfterPause: state.timeNotificationDuration - Date.now() }),
      false,
      "setTimeNotificationAfterPause"
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
      "unsetNotificationTimer"
    ),
});
