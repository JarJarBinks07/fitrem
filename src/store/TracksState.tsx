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
  date?: number;
}

export type StateTrackWithExercise = {
  preloadedImage: string;
  allTracks: ITrack[];
  allExercises: IExercise[];
  selectedExercisesByID: number[];
  selectedCategoryTracks: string[];
  userTraining: IExercise[];
  passedExercises: IExercise[];
  savedHistoryDoneExercises: IExercise[];
  setAllTracks: (value: ITrack[]) => void;
  setOrderTracks: (value: ITrack[]) => void;
  setAllExercises: (value: IExercise[]) => void;
  setSelectedExercisesByID: (value: number) => void;
  setSelectedCategoryTracks: (value: string) => void;
  setReorderedSelectedCategoryTracks: () => void;
  generateUserTraining: () => void;
  setPassedExercises: (value: number, status: "done" | "skipped") => void;
};

export const createTracksState: MyStateCreator<StateTrackWithExercise> = (set) => ({
  preloadedImage: "/assets/tracks/test.jpg",

  allTracks: [],
  setAllTracks: (value) => set({ allTracks: value }, false, "setAllTracks"),
  setOrderTracks: (value) => set(() => ({ allTracks: value }), false, "setOrderTracks"),

  allExercises: [],
  setAllExercises: (value) => set(() => ({ allExercises: value }), false, "setAllExercises"),

  selectedExercisesByID: [],
  setSelectedExercisesByID: (value) =>
    set(
      (state) => {
        let newExercisesID = [...state.selectedExercisesByID];
        if (state.selectedExercisesByID.includes(value)) {
          if (state.selectedExercisesByID.length) {
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

  selectedCategoryTracks: [],
  setSelectedCategoryTracks: (value: string) =>
    set(
      (state) => {
        let newCategories = [...state.selectedCategoryTracks];
        if (state.selectedCategoryTracks.includes(value)) {
          if (state.selectedCategoryTracks.length) {
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
        const activeTracks = [...state.selectedCategoryTracks];
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
        const result = [] as IExercise[];
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

        return { userTraining: result, passedExercises: [] };
      },
      false,
      "generateUserTraining"
    ),
  savedHistoryDoneExercises: [],
  passedExercises: [],
  setPassedExercises: (value, status) =>
    set(
      (state) => {
        const newUserTraining = [...state.userTraining];
        let newDoneExercises = [...state.passedExercises];
        let historyData = [];

        ////////////////////Step #1////////////////////

        /////Add exercise from doneExercises to userTraining/////
        const groupedByDoneCategory = _.groupBy(newDoneExercises, "category");
        const groupedByUserTrainingCategory = _.groupBy(newUserTraining, "category");
        for (const key in groupedByUserTrainingCategory) {
          if (!groupedByDoneCategory[key]) {
            groupedByDoneCategory[key] = [];
          } else if (groupedByUserTrainingCategory[key].length <= groupedByDoneCategory[key].length) {
            const [firstExerciseFromDoneByCategory] = groupedByDoneCategory[key].splice(0, 1);
            newUserTraining.push(firstExerciseFromDoneByCategory);
            newDoneExercises = newDoneExercises.filter((e) => e.id !== firstExerciseFromDoneByCategory.id);
          }
        }
        ////////////////////Step #2////////////////////

        ///////////////TEST//////////////////

        ///////////////TEST//////////////////
        /////Find next exercise from current category/////

        const [currentDoneExercise] = [...newUserTraining].filter((e, index) => index === value);
        const findNextExerciseFromCategory = newUserTraining.find(
          ({ category, id }) => id !== currentDoneExercise.id && category === currentDoneExercise.category
        );

        /////Remove done/skipped exercise from userTraining and add to doneExercises /////

        if (findNextExerciseFromCategory?.id && !newDoneExercises.includes(currentDoneExercise)) {
          const result = newUserTraining.filter((e) => e.id !== findNextExerciseFromCategory.id);
          const [removedExerciseFromTraining] = result.splice(value, 1, findNextExerciseFromCategory);
          if (status === "done") {
            removedExerciseFromTraining.status = status;
            removedExerciseFromTraining.date = Date.now();
            historyData.push(removedExerciseFromTraining);
          } else {
            removedExerciseFromTraining.status = status as "skipped";
          }

          return {
            userTraining: result,
            savedHistoryDoneExercises: [...state.savedHistoryDoneExercises, ...historyData],
            passedExercises: [...newDoneExercises, removedExerciseFromTraining],
          };
        } else return state;
        // return state;
      },
      false,
      "setDoneExercises"
    ),
});
