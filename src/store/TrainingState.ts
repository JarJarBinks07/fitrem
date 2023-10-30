import { MyStateCreator } from "./useCombineStates";

export interface ITraining {
  swiperTrackIndex: number;
  startWorkout: boolean;
  playStatus: boolean;
  playerId: number;
  preparationTime: number;
  timerTrainingInterval: number;
  timerRestInterval: number;
  timerTrainingStatus: "start" | "pause";
  timerMode: "preparation" | "training" | "rest";
  timerTrainingKey: number;
  timeTrainingDuration: number;
  timeTrainingAfterPause: number;
  disabledNavigationButtons: boolean;
  disabledPlayDoneButtons: boolean;
  setSwiperTrackIndex: (value: number) => void;
  setStartWorkout: (value: boolean) => void;
  setPlayStatus: (value: boolean) => void;
  setPlayerId: () => void;
  setTimerTrainingInterval: (value: number) => void;
  setTimerRestInterval: (value: number) => void;
  setTimerTrainingStatus: (value: "start" | "pause") => void;
  setTimerMode: (value: "preparation" | "training" | "rest") => void;
  setTimerTrainingKey: () => void;
  setTimeTrainingDuration: (value: number) => void;
  setTimeTrainingAfterPause: () => void;
  unsetTrainingTimer: () => void;
  unsetWhenDone: () => void;
  unsetForPersist: () => void;
  setDisabledNavigationButtons: (value: boolean) => void;
  setDisabledPlayDoneButtons: () => void;
}

export const createTrainingState: MyStateCreator<ITraining> = (set) => ({
  swiperTrackIndex: 0,
  setSwiperTrackIndex: (value) => set(() => ({ swiperTrackIndex: value }), false, "setSwiperTrackIndex"),

  startWorkout: false,
  setStartWorkout: (value) => set((state) => ({ startWorkout: value }), false, "setStartWorkout"),

  playStatus: false,
  setPlayStatus: (value) => set(() => ({ playStatus: value }), false, "setPlayStatus"),

  playerId: Date.now(),
  setPlayerId: () => set(() => ({ playerId: Date.now() }), false, "setPlayerId"),

  preparationTime: 10,

  timerTrainingInterval: 45,
  setTimerTrainingInterval: (value) => set(() => ({ timerTrainingInterval: value }), false, "setTimerTrainingInterval"),

  timerRestInterval: 30,
  setTimerRestInterval: (value) => set(() => ({ timerRestInterval: value }), false, "setTimerRestInterval"),

  timerTrainingStatus: "pause",
  setTimerTrainingStatus: (value) => set(() => ({ timerTrainingStatus: value }), false, "setTimerTrainingStatus"),

  timerMode: "training",
  setTimerMode: (value) => set(() => ({ timerMode: value }), false, "setTimerMode"),

  timerTrainingKey: Date.now(),
  setTimerTrainingKey: () => set(() => ({ timerTrainingKey: Date.now() }), false, "setTimerTrainingKey"),

  timeTrainingDuration: 0,
  setTimeTrainingDuration: (value) =>
    set(() => ({ timeTrainingDuration: Date.now() + value }), false, "setTimeTrainingDuration"),

  timeTrainingAfterPause: 0,
  setTimeTrainingAfterPause: () =>
    set(
      (state) => ({ timeTrainingAfterPause: state.timeTrainingDuration - Date.now() }),
      false,
      "setTimeTrainingAfterPause"
    ),

  disabledNavigationButtons: true,
  setDisabledNavigationButtons: (value) =>
    set((state) => ({ disabledNavigationButtons: value }), false, "setDisabledNavigationButtons"),

  disabledPlayDoneButtons: false,
  setDisabledPlayDoneButtons: () =>
    set((state) => ({ disabledPlayDoneButtons: !state.disabledPlayDoneButtons }), false, "setDisabledPlayDoneButtons"),

  unsetTrainingTimer: () =>
    set(
      (state) => ({
        timeTrainingAfterPause: 0,
        timerTrainingKey: Date.now(),
        disabledPlayDoneButtons: state.disabledPlayDoneButtons === true ? false : true,
      }),

      false,
      "unsetTrainingTimer"
    ),

  unsetWhenDone: () =>
    set(
      () => ({ timeTrainingDuration: 0, timeTrainingAfterPause: 0, timerTrainingKey: Date.now() }),
      false,
      "unsetWhenDone"
    ),

  unsetForPersist: () =>
    set(
      (state) => ({
        timerTrainingKey: Date.now(),
        timeTrainingDuration: 0,
        timeTrainingAfterPause: 0,
        playStatus: false,
        timerTrainingStatus: state.timerMode === "training" ? "pause" : "start",
      }),
      false,
      "unsetForPersist"
    ),
});
