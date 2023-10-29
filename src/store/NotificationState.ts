import { MyStateCreator } from "./useCombineStates";

export interface INotification {
  notificationStatus: boolean;
  timerNotificationInterval: number;
  timerNotificationStatus: "idle" | "running" | "pause";
  timerNotificationKey: number;
  timeNotificationDuration: number;
  timeNotificationAfterPause: number;
  setNotificationStatus: (value: boolean) => void;
  setTimerNotificationInterval: (value: number) => void;
  setTimerNotificationStatus: (value: "idle" | "running" | "pause") => void;
  setTimerNotificationKey: () => void;
  setTimeNotificationDuration: (value: number) => void;
  setTimeNotificationAfterPause: () => void;
  unsetNotificationTimer: () => void;
}

export const createNotificationState: MyStateCreator<INotification> = (set) => ({
  notificationStatus: false,
  setNotificationStatus: (value) => set(() => ({ notificationStatus: value }), false, "setNotificationStatus"),

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
