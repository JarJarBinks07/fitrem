import { MyStateCreator, useCombineStates } from "./useCombineStates";
import ISwiper from "swiper";

export interface ITimerTraining {
  swiperTrackIndex: number;
  startWorkout: boolean;
  playStatus: boolean;
  playerId: number;
  preparationTime: number;
  workIntervalForTraining: number;
  restIntervalForTraining: number;
  timerStatusForTraining: "start" | "pause";
  timerMode: "preparation" | "training" | "rest";
  timerKeyForTraining: number;
  timerDurationForTraining: number;
  timeAfterPauseForTraining: number;
  disabledNavButtonsWhenTrainingStarts: boolean;
  disabledPlayDoneButtons: boolean;
  setSwiperTrackIndex: (value: number) => void;
  setStartWorkout: () => void;
  setPlayStatus: (value: boolean) => void;
  setPlayerId: () => void;
  setWorkIntervalForTraining: (value: number) => void;
  setRestIntervalForTraining: (value: number) => void;
  setTimerStatusForTraining: (value: "start" | "pause") => void;
  setTimerMode: (value: "preparation" | "training" | "rest") => void;
  setTimerKeyForTraining: () => void;
  setTimerDurationForTraining: (value: number) => void;
  setTimeAfterPauseForTraining: () => void;
  unsetTimerForTraining: () => void;
  unsetWhenDone: () => void;
  unsetForPersist: () => void;
  setDisabledNavButtonsWhenTrainingStarts: () => void;
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

  workIntervalForTraining: 45,
  setWorkIntervalForTraining: (value) =>
    set(() => ({ workIntervalForTraining: value }), false, "setWorkIntervalForTraining"),

  restIntervalForTraining: 30,
  setRestIntervalForTraining: (value) =>
    set(() => ({ restIntervalForTraining: value }), false, "setRestIntervalForTraining"),

  timerStatusForTraining: "pause",
  setTimerStatusForTraining: (value) => set(() => ({ timerStatusForTraining: value }), false, "setTimerStatusForTraining"),

  timerMode: "training",
  setTimerMode: (value) => set(() => ({ timerMode: value }), false, "setTimerMode"),

  timerKeyForTraining: Date.now(),
  setTimerKeyForTraining: () => set(() => ({ timerKeyForTraining: Date.now() }), false, "setTimerKeyForTraining"),

  timerDurationForTraining: 0,
  setTimerDurationForTraining: (value) =>
    set(() => ({ timerDurationForTraining: Date.now() + value }), false, "setTimerDurationForTraining"),

  timeAfterPauseForTraining: 0,
  setTimeAfterPauseForTraining: () =>
    set(
      (state) => ({ timeAfterPauseForTraining: state.timerDurationForTraining - Date.now() }),
      false,
      "setTimerAfterPauseForTraining"
    ),

  disabledNavButtonsWhenTrainingStarts: true,
  setDisabledNavButtonsWhenTrainingStarts: () =>
    set(
      (state) => ({ disabledNavButtonsWhenTrainingStarts: !state.disabledNavButtonsWhenTrainingStarts }),
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
  unsetTimerForTraining: () =>
    set(
      (state) => ({
        timeAfterPauseForTraining: 0,
        timerKeyForTraining: Date.now(),
        disabledPlayDoneButtons: state.disabledPlayDoneButtons === true ? false : true,
      }),

      false,
      "unsetTimerForTraining"
    ),
  unsetWhenDone: () =>
    set(
      () => ({ timerDurationForTraining: 0, timeAfterPauseForTraining: 0, timerKeyForTraining: Date.now() }),
      false,
      "unsetWhenDone"
    ),

  unsetForPersist: () =>
    set(
      (state) => {
        if (state.timerMode === "rest" || state.timerMode === "preparation") {
          return {
            playStatus: false,
            timerStatusForTraining: "start",
          };
        } else {
          return {
            playStatus: false,
            timerStatusForTraining: "pause",
          };
        }
      },
      false,
      "unsetForPersist"
    ),
});
