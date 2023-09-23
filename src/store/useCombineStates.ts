import { StateCreator, create } from "zustand";
import { StateStorage, createJSONStorage, devtools, persist } from "zustand/middleware";
import { createTestState, ITest } from "./TestState";
import { createTimerState, ITimer } from "./TimerState";
import { CustomSqliteStorage } from "./CustomSqliteStorage";

export type CombineState = ITest & ITimer;

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
        ...createTestState(...a),
        ...createTimerState(...a),
      }),
      {
        name: "combineStore",
        partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => !ignoreList.includes(key))),
        storage: createJSONStorage(() => SqliteStorage),
      }
    )
  )
);
