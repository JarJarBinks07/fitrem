import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createNotificationState, INotification } from "./NotificationState";
import { createTrainingState, ITraining } from "./TrainingState";
import { IRoot, createRootState } from "./RootState";
import { TrackState, createTracksState } from "./TracksState";
import { createUserState, IUser } from "./UserState";
import { IGuide, createGuideState } from "./GuideState";
import { IModal, createModalWindowsState } from "./ModalWindowsState";
import { IChart, createChartState } from "./ChartState";
import { IMessageState, createMessageState } from "./MessageState";

export type CombineState = IRoot & INotification & ITraining & TrackState & IUser & IGuide & IModal & IChart & IMessageState;

type MyStateCreator<T> = StateCreator<CombineState, [["zustand/devtools", never]], [], T>;
export default MyStateCreator;

export const useCombineStates = create<CombineState>()(
  devtools(
    (...a) => ({
      ...createMessageState(...a),
      ...createChartState(...a),
      ...createModalWindowsState(...a),
      ...createGuideState(...a),
      ...createUserState(...a),
      ...createTracksState(...a),
      ...createTrainingState(...a),
      ...createNotificationState(...a),
      ...createRootState(...a),
    }),
    {
      name: "combineStore",
    }
  )
);
