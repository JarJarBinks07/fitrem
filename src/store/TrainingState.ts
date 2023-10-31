import { MyStateCreator } from "./useCombineStates";

export interface ITraining {
  startWorkout: boolean;
  swiperTrackIndex: number;
  playStatus: boolean;
  playerId: number;
  timerTrainingStatus: "start" | "pause";
  timerMode: "preparation" | "training" | "rest";
  timerTrainingKey: number;
  preparationTime: number;
  timerTrainingInterval: number;
  timerRestInterval: number;
  timeTrainingDuration: number;
  timeTrainingAfterPause: number;
  disabledNavigationButtons: boolean;
  disabledPlayDoneButtons: boolean;
  isOpenSwiperAlert: boolean;
  setStartWorkout: (value: boolean) => void;
  setSwiperTrackIndex: (value: number) => void;
  setPlayStatus: (value: boolean) => void;
  setPlayerId: () => void;
  setTimerTrainingStatus: (value: "start" | "pause") => void;
  setTimerMode: (value: "preparation" | "training" | "rest") => void;
  setTimerTrainingKey: () => void;
  setTimerTrainingInterval: (value: number) => void;
  setTimerRestInterval: (value: number) => void;
  setTimeTrainingDuration: (value: number) => void;
  setTimeTrainingAfterPause: () => void;
  setDisabledNavigationButtons: (value: boolean) => void;
  setDisabledPlayDoneButtons: (value: boolean) => void;
  setIsOpenSwiperAlert: (value: boolean) => void;
  unsetTrainingTimer: () => void;
  unsetWhenDone: () => void;
  unsetForPersist: () => void;
}

export const createTrainingState: MyStateCreator<ITraining> = (set) => ({
  startWorkout: true,
  setStartWorkout: (value) => set((state) => ({ startWorkout: value }), false, "setStartWorkout"),

  swiperTrackIndex: 0,
  setSwiperTrackIndex: (value) => set(() => ({ swiperTrackIndex: value }), false, "setSwiperTrackIndex"),

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
    set(() => ({ disabledNavigationButtons: value }), false, "setDisabledNavigationButtons"),

  disabledPlayDoneButtons: false,
  setDisabledPlayDoneButtons: (value) =>
    set((state) => ({ disabledPlayDoneButtons: value }), false, "setDisabledPlayDoneButtons"),

  isOpenSwiperAlert: false,
  setIsOpenSwiperAlert: (value) => set(() => ({ isOpenSwiperAlert: value }), false, "setIsOpenSwiperAlert"),

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
        playerId: Date.now(),
        timerTrainingStatus: state.timerMode === "training" ? "pause" : "start",
      }),
      false,
      "unsetForPersist"
    ),
});
