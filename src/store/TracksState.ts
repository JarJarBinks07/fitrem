import MyStateCreator from "./useCombineStates";
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
  date?: number;
  duration?: number;
  status?: "done" | "skipped";
}

export type TrackState = {
  preloadedImage: string;
  isModalStatistic: boolean;
  allTracks: ITrack[];
  allExercises: IExercise[];
  selectedExercisesByID: number[];
  selectedCategoryTracks: string[];
  userTraining: IExercise[];
  passedExercisesDuringSession: IExercise[];
  savedInHistoryDoneExercises: IExercise[];
  setAllTracks: (value: ITrack[]) => void;
  setOrderTracks: (value: ITrack[]) => void;
  setAllExercises: (value: IExercise[]) => void;
  setSelectedExercisesByID: (value: number) => void;
  setSelectedAllExercise: (value: string) => void;
  setSelectedCategory: (value: string) => void;
  setSelectedAllCategories: () => void;
  setReorderedSelectedCategory: () => void;
  generateUserTraining: () => void;
  setExercisesAfterTraining: () => void;
  setSkippedExercise: (value: number) => void;
  setDoneExercise: (value: number) => void;
  setIsModalStatistic: () => void;
};

export const createTracksState: MyStateCreator<TrackState> = (set) => ({
  preloadedImage: "/assets/tracks/test.jpg",

  isModalStatistic: false,
  setIsModalStatistic: () => set((state) => ({ isModalStatistic: !state.isModalStatistic }), false, "setIsModalStatistic"),

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
        let _categories = [...state.selectedCategoryTracks];
        const currentCategory = state.allExercises.find((e) => e.id === value);
        if (_exercisesID.includes(value)) {
          // removing checkbox with last exercise removing
          if (_exercisesID.length === 1) {
            _categories = _categories.filter((e) => e !== currentCategory?.category);
          }
          _exercisesID = _exercisesID.filter((e) => e !== value);
        } else {
          _exercisesID.push(value);
        }
        return { selectedExercisesByID: _exercisesID, selectedCategoryTracks: _categories };
      },
      false,
      "setSelectedExercisesByID"
    ),

  setSelectedAllExercise: (value) =>
    set(
      (state) => {
        const _allExercises = [...state.allExercises];
        const _groupedByCategory = _.groupBy(_allExercises, "category");
        const _filteredExercisesID = _groupedByCategory[value]
          .map((e) => e.id)
          .filter((e) => !state.selectedExercisesByID.includes(e));
        return { selectedExercisesByID: [...state.selectedExercisesByID, ..._filteredExercisesID] };
      },
      false,
      "setSelectedAllExercise"
    ),

  selectedCategoryTracks: [],
  setSelectedCategory: (value: string) =>
    set(
      (state) => {
        let _categories = [...state.selectedCategoryTracks];
        if (_categories.includes(value)) {
          _categories = _categories.filter((e) => e !== value);
        } else {
          _categories.push(value);
        }
        return { selectedCategoryTracks: _categories };
      },
      false,
      "setSelectedCategoryTracks"
    ),

  setSelectedAllCategories: () =>
    set(
      (state) => {
        const _categories = [...state.allTracks];
        const _filteredCategories = _categories
          .map((e) => e.category)
          .filter((e) => !state.selectedCategoryTracks.includes(e));
        return { selectedCategoryTracks: [...state.selectedCategoryTracks, ..._filteredCategories] };
      },
      false,
      "setSelectedAllCategoriesTracks"
    ),

  setReorderedSelectedCategory: () =>
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
        // get active exercises
        const _activeTracks = [...state.selectedCategoryTracks];
        const _activeExercises = [];
        for (const key of state.selectedExercisesByID) {
          const currentActiveExercise = state.allExercises.filter((e) => e.id === key);
          if (currentActiveExercise.length) {
            _activeExercises.push(...currentActiveExercise);
          }
        }
        // shuffle _activeTracks
        const newArrOfActiveExercises = [..._activeExercises];
        const shuffledArray = _.shuffle(newArrOfActiveExercises);

        // sort one by one//
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

        return { userTraining: result, passedExercisesDuringSession: [] };
      },
      false,
      "generateUserTraining"
    ),

  passedExercisesDuringSession: [],
  savedInHistoryDoneExercises: [],

  setSkippedExercise: (value) =>
    set(
      (state) => {
        const _userTraining = [...state.userTraining];
        const _activeTracks = [...state.selectedCategoryTracks];
        const _currentCategory = _userTraining[value].category;
        const _groupedByTrainingCategory = _.groupBy(_userTraining, "category");
        const result = [];

        //check if user selected only one exercise from active track
        if (_userTraining.length === Object.keys(_groupedByTrainingCategory).length) return state;

        //if user selected more than one exercise from track
        const [replacedCurrentExercise] = _groupedByTrainingCategory[_currentCategory].splice(0, 1);
        _groupedByTrainingCategory[_currentCategory].push(replacedCurrentExercise);

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
        const setUpdatedStatus = {
          ..._currentExercise,
          status: "done" as "done",
          date: Date.now(),
          duration: state.timerTrainingInterval,
        };
        return {
          passedExercisesDuringSession: [...state.passedExercisesDuringSession, _currentExercise],
          savedInHistoryDoneExercises: [...state.savedInHistoryDoneExercises, setUpdatedStatus],
        };
      },
      false,
      "setDoneExercise"
    ),

  setExercisesAfterTraining: () =>
    set(
      (state) => {
        const _userTraining = [...state.userTraining];
        const _groupedByTrainingCategory = _.groupBy(_userTraining, "category");
        const _activeTracks = [...state.selectedCategoryTracks];
        const result = [];

        //check if user selected only one exercise from active track
        if (_userTraining.length === Object.keys(_groupedByTrainingCategory).length)
          return { passedExercisesDuringSession: [] };

        //if user selected more than one exercise from track
        let maxLength = 0;
        for (const key of _activeTracks) {
          if (!_groupedByTrainingCategory[key]) {
            _groupedByTrainingCategory[key] = [];
          }
          const [replacedCurrentExercise] = _groupedByTrainingCategory[key].splice(0, 1);
          _groupedByTrainingCategory[key].push(replacedCurrentExercise);
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
        return { userTraining: result, passedExercisesDuringSession: [] };
      },
      false,
      "setExercisesAfterTraining"
    ),
});
