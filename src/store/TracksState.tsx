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
  counterDoneExercises: number;
  preloadedImage: string;
  allTracks: ITrack[];
  allExercises: IExercise[];
  selectedExercisesByID: number[];
  selectedCategoryTracks: string[];
  userTraining: IExercise[];
  passedExercises: IExercise[];
  savedInHistoryDoneExercises: IExercise[];
  setAllTracks: (value: ITrack[]) => void;
  setOrderTracks: (value: ITrack[]) => void;
  setAllExercises: (value: IExercise[]) => void;
  setSelectedExercisesByID: (value: number) => void;
  setSelectedCategoryTracks: (value: string) => void;
  setReorderedSelectedCategoryTracks: () => void;
  generateUserTraining: () => void;
  setPassedExercises: (value: number, status: "done" | "skipped") => void;
  setFilteredTrainingExercise: () => void;
  //////////////////////////////
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
        // for (let i = newArrOfActiveExercises.length - 1; i > 0; i--) {
        //   const j = Math.floor(Math.random() * (i + 1));
        //   [newArrOfActiveExercises[i], newArrOfActiveExercises[j]] = [
        //     newArrOfActiveExercises[j],
        //     newArrOfActiveExercises[i],
        //   ];
        // }
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
  savedInHistoryDoneExercises: [],
  passedExercises: [],
  setFilteredTrainingExercise: () =>
    set(
      (state) => {
        const newUserTraining = [...state.userTraining];
        const newPassedExercises = [...state.passedExercises];
        //Step#1 comparison userTraining with passedExercises for returning values
        // console.log("state.passedExercises ORIGIN:", state.passedExercises);
        const { _userTraining, _passedExercises } = checkAllCategories(newUserTraining, newPassedExercises);
        /////TEST/////

        // const filteredExercises = newPassedExercises.filter((e) => !_userTraining.find((j) => e.id === j.id));
        // console.log("FILTERED", filteredExercises);

        /////TEST//////
        // console.log("state.passedExercises after GROUP:", state.passedExercises);
        // const filteredUserTraining = _.differenceBy(state.passedExercises, _userTraining, "id");
        console.log("_userTraining:", _userTraining);
        console.log("_passedExercises:", _passedExercises);
        // const uniqueExercises = _passedExercises.reduce((accumulator: IExercise[], obj) => {
        //   if (!accumulator.find((item) => item.id === obj.id)) {
        //     accumulator.push(obj);
        //   }
        //   return accumulator;
        // }, []);

        const filteredUserTraining = _.differenceBy(_passedExercises, _userTraining, "id");

        // console.log("uniqueExercises:", uniqueExercises);

        // const filteredExercises = [...uniqueExercises].filter((e) => {
        //   return !_userTraining.some((j) => j.id === e.id);
        // });
        console.log("filteredExercises:", filteredUserTraining);

        // console.log("filteredExercises:", filteredExercises);
        console.log("_userTraining AFTER:", _userTraining);
        console.log("_passedExercises AFTER:", _passedExercises);
        // console.log("uniqueExercises AFTER:", uniqueExercises);

        // console.log("UNIQUE", uniqueExercises);
        // const filteredUserTraining = _.differenceBy(uniqueExercises, _userTraining, "id");
        // const filteredUserTraining = uniqueExercises.filter((e) => !_userTraining.find((j) => e.id === j.id));

        // console.log("FILTERED", filteredExercises);
        // console.log("state.passedExercises after FILTRATION:", state.passedExercises);
        // console.log("filteredUserTraining after FILTRATION:", filteredUserTraining);

        // return { passedExercises: filteredUserTraining };

        return state;
      },
      false,
      "setFilteredTrainingExercise"
    ),
  setPassedExercises: (value, status) =>
    set(
      (state) => {
        let newUserTraining = [...state.userTraining];
        const newPassedExercises = [...state.passedExercises];
        // let historyData = [];

        ////////////////////Step #1////////////////////

        /////Add exercise from doneExercises to userTraining/////
        // const groupedByDoneCategory = _.groupBy(newDoneExercises, "category");
        // const groupedByUserTrainingCategory = _.groupBy(newUserTraining, "category");
        // for (const key in groupedByUserTrainingCategory) {
        //   if (!groupedByDoneCategory[key]) {
        //     groupedByDoneCategory[key] = [];
        //   } else if (groupedByUserTrainingCategory[key].length <= groupedByDoneCategory[key].length) {
        //     const [firstExerciseFromDoneByCategory] = groupedByDoneCategory[key].splice(0, 1);
        //     newUserTraining.push(firstExerciseFromDoneByCategory);
        //     newDoneExercises = newDoneExercises.filter((e) => e.id !== firstExerciseFromDoneByCategory.id);
        //   }
        // }
        ////////////////////Step #2////////////////////

        ///////////////TEST//////////////////

        //write current exercise to passedExercise with status "done" or remove exercise with status "skipped"
        //srtage#2
        const currentExercise = newUserTraining[value];
        if (!currentExercise) return state;
        if (status === "done") {
          const setUpdatedStatus = { ...currentExercise, status: status, date: Date.now() };
          return {
            passedExercises: [...state.passedExercises, currentExercise],
            savedInHistoryDoneExercises: [...state.savedInHistoryDoneExercises, setUpdatedStatus],
          };
        } else {
          const findNextExerciseFromCategory = newUserTraining.find(
            ({ category, id }) => id !== currentExercise.id && category === currentExercise.category
          );
          console.log("FINDDDDDD", findNextExerciseFromCategory);
          if (!findNextExerciseFromCategory) return state;
          newUserTraining = newUserTraining.filter((e) => e.id !== findNextExerciseFromCategory.id);
          newUserTraining.splice(value, 1, findNextExerciseFromCategory);
          newPassedExercises.push(currentExercise);
          console.log("WORKSSSSS");
          return { userTraining: newUserTraining, passedExercises: newPassedExercises };
        }

        ///////////////TEST//////////////////
        /////Find next exercise from current category/////

        // const currentExercise = newUserTraining.find((e, index) => index === value);
        // const findNextExerciseFromCategory = newUserTraining.find(
        //   ({ category, id }) => id !== currentExercise?.id && category === currentExercise?.category
        // );

        /////Remove done/skipped exercise from userTraining and add to doneExercises /////

        // if (findNextExerciseFromCategory?.id) {
        //   const result = newUserTraining.filter((e) => e.id !== findNextExerciseFromCategory.id);
        //   const [removedExerciseFromTraining] = result.splice(value, 1, findNextExerciseFromCategory);
        //   if (status === "done") {
        //     removedExerciseFromTraining.status = status;
        //     removedExerciseFromTraining.date = Date.now();
        //     historyData.push(removedExerciseFromTraining);
        //   } else {
        //     removedExerciseFromTraining.status = status as "skipped";
        //   }

        //   return {
        //     userTraining: result,
        //     savedHistoryDoneExercises: [...state.savedHistoryDoneExercises, ...historyData],
        //     passedExercises: [...newDoneExercises, removedExerciseFromTraining],
        //   };
        // } else return state;
        // return state;
      },
      false,
      "setDoneExercises"
    ),

  setSkippedExercise: (value) =>
    set(
      (state) => {
        //Step#1 variables

        let newUserTraining = [...state.userTraining];
        let newPassedExercises = [...state.passedExercises];
        //Step#2 comparison userTraining with passedExercises for returning values

        let { _userTraining, _passedExercises } = checkCurrentCategory(newUserTraining, newPassedExercises, value);

        // const currentCategory = _userTraining[value].category;
        // const _groupedByPassedCategory = _.groupBy(_passedExercises, "category");
        // const _groupedByUserTrainingCategory = _.groupBy(_userTraining, "category");
        // for (const key in _groupedByUserTrainingCategory) {
        //   if (!_groupedByPassedCategory[key]) {
        //     _groupedByPassedCategory[key] = [];
        //   }
        // }
        // if (_groupedByUserTrainingCategory[currentCategory]?.length <= _groupedByPassedCategory[currentCategory]?.length) {
        //   const [firstExerciseFromPassedByCategory] = _groupedByPassedCategory[currentCategory].splice(0, 1);
        //   _userTraining.push(firstExerciseFromPassedByCategory);
        //   _passedExercises = _passedExercises.filter((e) => e.id !== firstExerciseFromPassedByCategory.id);
        // }

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
          passedExercises: [...state.passedExercises, _currentExercise],
          savedInHistoryDoneExercises: [...state.savedInHistoryDoneExercises, setUpdatedStatus],
          counterDoneExercises: ++state.counterDoneExercises,
        };
      },
      false,
      "setDoneExercise"
    ),
});
