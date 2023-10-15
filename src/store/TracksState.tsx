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
  status?: "done" | "skipped";
}

export type StateTrackWithExercise = {
  allTracks: ITrack[];
  allExercises: IExercise[];
  selectedExercisesByID: number[];
  selectedCategoryTracks: string[];
  userTraining: IExercise[];
  doneExercises: IExercise[];
  setAllTracks: (value: ITrack[]) => void;
  setOrderTracks: (value: ITrack[]) => void;
  setAllExercises: (value: IExercise[]) => void;
  setSelectedExercisesByID: (value: number) => void;
  setSelectedCategoryTracks: (value: string) => void;
  setReorderedSelectedCategoryTracks: () => void;
  generateUserTraining: () => void;
  setDoneExercises: (value: number, status: string) => void;
};

export const createTracksState: MyStateCreator<StateTrackWithExercise> = (set) => ({
  allTracks: [],
  setAllTracks: (value) => set({ allTracks: value }, false, "setAllTracks"),
  setOrderTracks: (value) => set(() => ({ allTracks: value }), false, "setOrderTracks"),

  allExercises: [],
  setAllExercises: (value) => set(() => ({ allExercises: value }), false, "setAllExercises"),

  selectedExercisesByID: [1],
  setSelectedExercisesByID: (value) =>
    set(
      (state) => {
        let newExercisesID = [...state.selectedExercisesByID];
        if (state.selectedExercisesByID.includes(value)) {
          if (state.selectedExercisesByID.length > 1) {
            newExercisesID = state.selectedExercisesByID.filter((e) => e != value);
          } else {
            return state;
          }
        } else {
          newExercisesID.push(value);
        }
        return { selectedExercisesByID: newExercisesID };
      },
      false,
      "setSelectedExercisesByID"
    ),

  selectedCategoryTracks: ["Biceps"],
  setSelectedCategoryTracks: (value: string) =>
    set(
      (state) => {
        let newCategories = [...state.selectedCategoryTracks];
        if (state.selectedCategoryTracks.includes(value)) {
          if (state.selectedCategoryTracks.length > 1) {
            newCategories = state.selectedCategoryTracks.filter((e) => e !== value);
          } else {
            return state;
          }
        } else {
          newCategories.push(value);
        }
        return { ...state, selectedCategoryTracks: newCategories };
      },
      false,
      "setSelectedCategoryTracks"
    ),
  setReorderedSelectedCategoryTracks: () =>
    set(
      (state) => {
        const reorderedArr = [...state.allTracks].map((item) => item.category);
        const filteredActiveTracks = reorderedArr.filter((e) => state.selectedCategoryTracks.includes(e));
        return { selectedCategoryTracks: filteredActiveTracks };
      },
      false,
      "setReorderedSelectedCategoryTracks"
    ),

  userTraining: [],
  generateUserTraining: () =>
    set(
      (state) => {
        /////Getting active exercises/////
        const activeTracks = state.selectedCategoryTracks;
        const activeExercises = [];
        for (const key of state.selectedExercisesByID) {
          const currentActiveExercise = state.allExercises.filter((e) => e.id === key);
          if (currentActiveExercise.length) {
            activeExercises.push(...currentActiveExercise);
          }
        }
        /////Shuffle activeTracks/////
        const newArrOfActiveExercises = [...activeExercises];
        for (let i = newArrOfActiveExercises.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArrOfActiveExercises[i], newArrOfActiveExercises[j]] = [
            newArrOfActiveExercises[j],
            newArrOfActiveExercises[i],
          ];
        }
        /////Sorting one by one/////
        const filteredExercises = newArrOfActiveExercises.filter((e) => activeTracks.includes(e.category));
        const groupedByCategory = _.groupBy(filteredExercises, "category");
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
      },
      false,
      "generateUserTraining"
    ),

  doneExercises: [],
  setDoneExercises: (value, status) =>
    set(
      (state) => {
        const newUserTraining = [...state.userTraining];
        const [currentDoneExercise] = [...state.userTraining].filter((e, index) => index === value);
        const findNextExerciseFromCategory = state.userTraining.find(
          ({ category, id }) => id !== currentDoneExercise.id && category === currentDoneExercise.category
        );
        if (findNextExerciseFromCategory?.id && !state.doneExercises.includes(currentDoneExercise)) {
          const result = newUserTraining.filter((e) => e.id !== findNextExerciseFromCategory.id);
          const [removedExercisesFromTraining] = result.splice(value, 1, findNextExerciseFromCategory);
          if (status === "skipped") {
            removedExercisesFromTraining.status = "skipped";
          } else {
            removedExercisesFromTraining.status = "done";
          }
          return {
            userTraining: result,
            doneExercises: [...state.doneExercises, removedExercisesFromTraining],
          };
        } else return state;
      },
      false,
      "setSkippedExercises"
    ),
});
