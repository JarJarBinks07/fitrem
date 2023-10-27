import { checkCurrentCategory, checkAllCategories } from "../shared/utils/checkCategory";
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

export type TrackState = {
  preloadedImage: string;
  allTracks: ITrack[];
  allExercises: IExercise[];
  selectedExercisesByID: number[];
  selectedCategoryTracks: string[];
  userTraining: IExercise[];
  passedExercises: IExercise[];
  counterDoneExercises: number;
  doneExercisesDuringSession: IExercise[];
  savedInHistoryDoneExercises: IExercise[];
  setAllTracks: (value: ITrack[]) => void;
  setOrderTracks: (value: ITrack[]) => void;
  setAllExercises: (value: IExercise[]) => void;
  setSelectedExercisesByID: (value: number) => void;
  setSelectedCategoryTracks: (value: string) => void;
  setReorderedSelectedCategoryTracks: () => void;
  generateUserTraining: () => void;
  setExercisesAfterTraining: () => void;
  setSkippedExercise: (value: number) => void;
  setDoneExercise: (value: number) => void;
  setCounter: () => void;
};

export const createTracksState: MyStateCreator<TrackState> = (set) => ({
  counterDoneExercises: 0,
  setCounter: () =>
    set((state) => ({ counterDoneExercises: 0, startWorkout: false, timerMode: "training" }), false, "setCounter"),

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
        const shuffledArray = _.shuffle(newArrOfActiveExercises);

        /////Sorting one by one/////
        const filteredExercises = shuffledArray.filter((e) => activeTracks.includes(e.category));
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

  doneExercisesDuringSession: [],
  passedExercises: [],
  savedInHistoryDoneExercises: [],

  setExercisesAfterTraining: () =>
    set(
      (state) => {
        const newUserTraining = [...state.userTraining];
        const newPassedExercises = [...state.passedExercises];

        //Step#2 comparison userTraining with passedExercises for returning values
        // console.log("state.userTraining:", state.userTraining);
        // console.log("state.passedExercises:", state.passedExercises);

        const { _userTraining, _passedExercises } = checkAllCategories(newUserTraining, newPassedExercises);
        const filteredUserTraining = _.differenceBy(_passedExercises, _userTraining, "id");

        // console.log("_userTraining:", _userTraining);
        // console.log("_passedExercises:", _passedExercises);
        // console.log("filteredUserTraining:", filteredUserTraining);
        return { userTraining: _userTraining, passedExercises: filteredUserTraining };
        // return state;
      },
      false,
      "setFilteredTrainingExercise"
    ),

  setSkippedExercise: (value) =>
    set(
      (state) => {
        //Step#1 variables

        let newUserTraining = [...state.userTraining];
        let newPassedExercises = [...state.passedExercises];

        //Step#2 comparison userTraining with passedExercises for returning values

        let { _userTraining, _passedExercises } = checkCurrentCategory(newUserTraining, newPassedExercises, value);

        //Step#3 find next exercise for replacing

        const _currentExercise = _userTraining[value];
        if (!_currentExercise) return state;
        const findNextExerciseFromCategory = _userTraining.find(
          ({ category, id }) => id !== _currentExercise.id && category === _currentExercise.category
        );
        if (!findNextExerciseFromCategory) return state;
        _userTraining = _userTraining.filter((e) => e.id !== findNextExerciseFromCategory.id);
        _userTraining.splice(value, 1, findNextExerciseFromCategory);
        _passedExercises.push(_currentExercise);
        return { userTraining: _userTraining, passedExercises: _passedExercises };
      },
      false,
      "setSkippedExercise"
    ),
  setDoneExercise: (value) =>
    set(
      (state) => {
        const _userTraining = [...state.userTraining];
        const _currentExercise = _userTraining[value];
        if (!_currentExercise) return state;
        const setUpdatedStatus = { ..._currentExercise, status: "done" as "done", date: Date.now() };
        return {
          doneExercisesDuringSession: [...state.doneExercisesDuringSession, _currentExercise],
          passedExercises: [...state.passedExercises, _currentExercise],
          savedInHistoryDoneExercises: [...state.savedInHistoryDoneExercises, setUpdatedStatus],
          counterDoneExercises: ++state.counterDoneExercises,
        };
      },
      false,
      "setDoneExercise"
    ),
});
