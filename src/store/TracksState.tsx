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
  isModalStatistic: boolean;
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
  setIsModalStatistic: () => void;
};

export const createTracksState: MyStateCreator<TrackState> = (set) => ({
  preloadedImage: "/assets/tracks/test.jpg",

  isModalStatistic: false,
  setIsModalStatistic: () => set((state) => ({ isModalStatistic: !state.isModalStatistic }), false, "setIsModalStatistic"),

  counterDoneExercises: 0,
  setCounter: () =>
    set((state) => ({ counterDoneExercises: 0, startWorkout: false, timerMode: "training" }), false, "setCounter"),

  allTracks: [],
  setAllTracks: (value) => set({ allTracks: value }, false, "setAllTracks"),
  setOrderTracks: (value) => set(() => ({ allTracks: value }), false, "setOrderTracks"),

  allExercises: [],
  setAllExercises: (value) => set(() => ({ allExercises: value }), false, "setAllExercises"),

  selectedExercisesByID: [],
  setSelectedExercisesByID: (value) =>
    set(
      (state) => {
        let _exercisesID = [...state.selectedExercisesByID];
        if (state.selectedExercisesByID.includes(value)) {
          if (state.selectedExercisesByID.length) {
            _exercisesID = state.selectedExercisesByID.filter((e) => e != value);
          } else {
            return state;
          }
        } else {
          _exercisesID.push(value);
        }
        return { selectedExercisesByID: _exercisesID };
      },
      false,
      "setSelectedExercisesByID"
    ),

  selectedCategoryTracks: [],
  setSelectedCategoryTracks: (value: string) =>
    set(
      (state) => {
        let _categories = [...state.selectedCategoryTracks];
        if (state.selectedCategoryTracks.includes(value)) {
          if (state.selectedCategoryTracks.length) {
            _categories = state.selectedCategoryTracks.filter((e) => e !== value);
          } else {
            return state;
          }
        } else {
          _categories.push(value);
        }
        return { ...state, selectedCategoryTracks: _categories };
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
        const _activeTracks = [...state.selectedCategoryTracks];
        const _activeExercises = [];
        for (const key of state.selectedExercisesByID) {
          const currentActiveExercise = state.allExercises.filter((e) => e.id === key);
          if (currentActiveExercise.length) {
            _activeExercises.push(...currentActiveExercise);
          }
        }
        /////Shuffle _activeTracks/////
        const newArrOfActiveExercises = [..._activeExercises];
        const shuffledArray = _.shuffle(newArrOfActiveExercises);

        /////Sorting one by one/////
        const filteredExercises = shuffledArray.filter((e) => _activeTracks.includes(e.category));
        const groupedByCategory = _.groupBy(filteredExercises, "category");
        const result = [] as IExercise[];
        let maxLength = 0;
        for (const key of _activeTracks) {
          if (!groupedByCategory[key]) {
            groupedByCategory[key] = [];
          }
          maxLength = Math.max(groupedByCategory[key].length, maxLength);
        }
        for (let i = 0; i < maxLength; i++) {
          for (const key of _activeTracks) {
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

  setSkippedExercise: (value) =>
    set(
      (state) => {
        const _userTraining = [...state.userTraining];
        const _passedExercises = [...state.passedExercises];
        const combineExercises = _userTraining.concat(_passedExercises);
        const _activeTracks = [...state.selectedCategoryTracks];
        const _currentCategory = _userTraining[value].category;
        const _groupedByTrainingCategory = _.groupBy(_userTraining, "category");

        //check if user selected only one exercise from active track
        if (combineExercises.length === Object.keys(_groupedByTrainingCategory).length) return state;

        //if user selected more than one exercise from track
        const [replacedCurrentExercise] = _groupedByTrainingCategory[_currentCategory].splice(0, 1);
        _groupedByTrainingCategory[_currentCategory].push(replacedCurrentExercise);
        const result = [] as IExercise[];
        let maxLength = 0;
        for (const key of _activeTracks) {
          if (!_groupedByTrainingCategory[key]) {
            _groupedByTrainingCategory[key] = [];
          }
          maxLength = Math.max(_groupedByTrainingCategory[key].length, maxLength);
        }
        for (let i = 0; i < maxLength; i++) {
          for (const key of _activeTracks) {
            const currentArray = _groupedByTrainingCategory[key];
            if (i < currentArray.length) {
              const currentElement = currentArray[i];
              result.push(currentElement);
            }
          }
        }
        return { userTraining: result };
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

  setExercisesAfterTraining: () =>
    set(
      (state) => {
        const _userTraining = [...state.userTraining];
        let _passedExercises = [...state.passedExercises];
        const _groupedByPassedCategory = _.groupBy(_passedExercises, "category");
        const _activeTracks = [...state.selectedCategoryTracks];

        //check if user selected only one exercise from active track
        if (_userTraining.length === _passedExercises.length) return { passedExercises: [], doneExercisesDuringSession: [] };

        //check if unique exercise exists in userTraining
        const filteredUserExercises = _.differenceBy(_userTraining, _passedExercises, "id");
        if (filteredUserExercises.length) return { userTraining: filteredUserExercises, doneExercisesDuringSession: [] };

        //check that user used all of valid exercise and then populate from passedExercises
        if (!filteredUserExercises.length) {
          for (const key of _activeTracks) {
            if (!_groupedByPassedCategory[key]) {
              _groupedByPassedCategory[key] = [];
            } else {
              const [firstFromPassedCategory] = _groupedByPassedCategory[key].splice(0, 1);
              filteredUserExercises.push(firstFromPassedCategory);
              _passedExercises = _passedExercises.filter((e) => e.id !== firstFromPassedCategory.id);
            }
          }
          return {
            userTraining: filteredUserExercises,
            passedExercises: _passedExercises,
            doneExercisesDuringSession: [],
          };
        }
        return state;
      },
      false,
      "setFilteredTrainingExercise"
    ),
});
