import { MyStateCreator } from "./useCombineStates";

export interface ITimerTraining {
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
  setStartWorkout: () => void;
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
  setDisabledNavigationButtons: () => void;
  setDisabledPlayDoneButtons: () => void;
}

export const createTimerStateForTraining: MyStateCreator<ITimerTraining> = (set) => ({
  swiperTrackIndex: 0,
  setSwiperTrackIndex: (value) => set(() => ({ swiperTrackIndex: value }), false, "setSwiperTrackIndex"),

  startWorkout: false,
  setStartWorkout: () => set((state) => ({ startWorkout: !state.startWorkout }), false, "setWorkout"),

  playStatus: false,
  setPlayStatus: (value) => set(() => ({ playStatus: value }), false, "setPlayStatus"),

  playerId: Date.now(),
  setPlayerId: () => set(() => ({ playerId: Date.now() }), false, "setPlayerId"),

  preparationTime: 10,

  timerTrainingInterval: 45,
  setTimerTrainingInterval: (value) => set(() => ({ timerTrainingInterval: value }), false, "setWorkIntervalForTraining"),

  timerRestInterval: 30,
  setTimerRestInterval: (value) => set(() => ({ timerRestInterval: value }), false, "setRestIntervalForTraining"),

  timerTrainingStatus: "pause",
  setTimerTrainingStatus: (value) => set(() => ({ timerTrainingStatus: value }), false, "setTimerStatusForTraining"),

  timerMode: "training",
  setTimerMode: (value) => set(() => ({ timerMode: value }), false, "setTimerMode"),

  timerTrainingKey: Date.now(),
  setTimerTrainingKey: () => set(() => ({ timerTrainingKey: Date.now() }), false, "setTimerKeyForTraining"),

  timeTrainingDuration: 0,
  setTimeTrainingDuration: (value) =>
    set(() => ({ timeTrainingDuration: Date.now() + value }), false, "setTimerDurationForTraining"),

  timeTrainingAfterPause: 0,
  setTimeTrainingAfterPause: () =>
    set(
      (state) => ({ timeTrainingAfterPause: state.timeTrainingDuration - Date.now() }),
      false,
      "setTimerAfterPauseForTraining"
    ),

  disabledNavigationButtons: true,
  setDisabledNavigationButtons: () =>
    set(
      (state) => ({ disabledNavigationButtons: !state.disabledNavigationButtons }),
      false,
      "setDisabledNavButtonsWhenTrainingStarts"
    ),
  disabledPlayDoneButtons: false,
  setDisabledPlayDoneButtons: () =>
    set(
      (state) => ({ disabledPlayDoneButtons: !state.disabledPlayDoneButtons }),
      false,
      "setDisabledMainButtonsExceptTraining"
    ),
  unsetTrainingTimer: () =>
    set(
      (state) => ({
        timeTrainingAfterPause: 0,
        timerTrainingKey: Date.now(),
        disabledPlayDoneButtons: state.disabledPlayDoneButtons === true ? false : true,
      }),

      false,
      "unsetTimerForTraining"
    ),
  unsetWhenDone: () =>
    set(
      () => ({ timeTrainingDuration: 0, timeTrainingAfterPause: 0, timerTrainingKey: Date.now() }),
      false,
      "unsetWhenDone"
    ),

  unsetForPersist: () =>
    set(
      (state) => {
        if (state.timerMode === "rest" || state.timerMode === "preparation") {
          return {
            playStatus: false,
            timerTrainingStatus: "start",
          };
        } else {
          return {
            playStatus: false,
            timerTrainingStatus: "pause",
          };
        }
      },
      false,
      "unsetForPersist"
    ),
});
