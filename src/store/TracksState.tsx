import { MyStateCreator } from "./useCombineStates";
import _ from "lodash";

export interface ITrack {
  id: number;
  category: string;
  img_path: string;
}

export interface IExercise {
  id: number;
  video_path: string;
  image_path: string;
  category: string;
  exercise: string;
  tools: boolean;
  description: string;
}

export type StateTrackWithExercise = {
  tracks: ITrack[];
  allExercises: IExercise[];
  selectedExercisesID: number[];
  userTraining: IExercise[];
  setTracks: (value: ITrack[]) => void;
  setExercises: (value: IExercise[]) => void;
  setSelectedExercisesID: (value: number) => void;
  generateUserTraining: () => void;
};

export const createTracksState: MyStateCreator<StateTrackWithExercise> = (set) => ({
  tracks: [],
  setTracks: (value) => set({ tracks: value }, false, "setTracks"),

  allExercises: [],
  setExercises: (value) => set(() => ({ allExercises: value }), false, "setExercises"),

  selectedExercisesID: [1],
  setSelectedExercisesID: (value) =>
    set(
      (state) => {
        let newExercisesID = [...state.selectedExercisesID];
        if (state.selectedExercisesID.includes(value)) {
          if (state.selectedExercisesID.length > 1) {
            newExercisesID = state.selectedExercisesID.filter((e) => e != value);
          } else {
            return state;
          }
        } else {
          newExercisesID.push(value);
        }
        return { selectedExercisesID: newExercisesID };
      },
      //   let newCategories = [...state.selectedExercisesID];
      //   if (state.selectedExercisesID.includes(value)) {
      //     // if (state.selectedExercisesID.length > 1) {
      //     newCategories = state.selectedExercisesID.filter((e) => e != value);
      //     // } else {
      //     //   return state;
      //     // }
      //   } else {
      //     newCategories.push(value);
      //   }
      //   return { ...state, selectedExercisesID: newCategories };
      // },
      false,
      "setCheckedExercises"
    ),

  userTraining: [],
  generateUserTraining: () =>
    set((state) => {
      const activeTracks = state.selectedTracks;
      const activeExercises = [];
      for (const key of state.selectedExercisesID) {
        const currentActiveExercise = state.allExercises.filter((e) => e.id === key);
        if (currentActiveExercise.length) {
          activeExercises.push(...currentActiveExercise);
        }
      }
      console.log(activeTracks);

      const filteredExercises = activeExercises.filter((e) => activeTracks.includes(e.category));
      const groupedByCategory = _.groupBy(filteredExercises, "category");
      console.log(groupedByCategory);
      const result = [];
      let maxLength = 0;
      for (const key of activeTracks) {
        if (!groupedByCategory[key]) {
          groupedByCategory[key] = [];
        }
        maxLength = Math.max(groupedByCategory[key].length, maxLength);
      }
      for (let i = 0; i < maxLength; i++) {
        for (const key of activeTracks) {
          const currentArray = groupedByCategory[key];
          if (i < currentArray.length) {
            const currentElement = currentArray[i];
            result.push(currentElement);
          }
        }
      }

      return { userTraining: result };
    }),
});
