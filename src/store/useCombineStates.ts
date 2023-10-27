import { StateCreator, create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { createNotificationState, INotification } from "./NotificationState";
import { createTrainingState, ITraining } from "./TrainingState";
import { CustomSqliteStorage } from "./CustomSqliteStorage";
import { IRoot, createRootState } from "./RootState";
import { TrackState, createTracksState } from "./TracksState";

export type CombineState = IRoot & INotification & ITraining & TrackState;

export type MyStateCreator<T> = StateCreator<
  CombineState,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  T
>;
// Add keys to ignore from persist
const ignoreList = ["timerStatus"];

const SqliteStorage = new CustomSqliteStorage();

export const useCombineStates = create<CombineState>()(
  devtools(
    persist(
      (...a) => ({
        ...createRootState(...a),
        ...createNotificationState(...a),
        ...createTrainingState(...a),
        ...createTracksState(...a),
      }),
      {
        name: "combineStore",
        partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => !ignoreList.includes(key))),

        storage: createJSONStorage(() => SqliteStorage),
        onRehydrateStorage: (state) => {
          console.log("hydration starts");

          // optional
          return (state, error) => {
            if (error) {
              console.log("an error happened during hydration", error);
            } else {
              useCombineStates.setState({ rehydrated: true, timerNotificationStatus: "idle" });
              console.log("hydration finished", state);
            }
          };
        },
      }
    )
  )
);
