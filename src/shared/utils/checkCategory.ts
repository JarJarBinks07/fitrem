import _ from "lodash";
import { IExercise } from "../../store/TracksState";

export const checkCurrentCategory = (_userTraining: IExercise[], _passedExercises: IExercise[], value: number) => {
  const currentCategory = _userTraining[value].category;
  const _groupedByPassedCategory = _.groupBy(_passedExercises, "category");
  const _groupedByUserTrainingCategory = _.groupBy(_userTraining, "category");
  for (const key in _groupedByUserTrainingCategory) {
    if (!_groupedByPassedCategory[key]) {
      _groupedByPassedCategory[key] = [];
    }
  }
  if (_groupedByUserTrainingCategory[currentCategory]?.length <= _groupedByPassedCategory[currentCategory]?.length) {
    const [firstExerciseFromPassedByCategory] = _groupedByPassedCategory[currentCategory].splice(0, 1);
    _userTraining.push(firstExerciseFromPassedByCategory);
    _passedExercises = _passedExercises.filter((e) => e.id !== firstExerciseFromPassedByCategory.id);
  }
  return { _userTraining, _passedExercises };
};

export const checkAllCategories = (_userTraining: IExercise[], _passedExercises: IExercise[]) => {
  const _groupedByPassedCategory = _.groupBy(_passedExercises, "category");
  const _groupedByTrainingCategory = _.groupBy(_userTraining, "category");
  console.log("_userTraining", _userTraining);
  console.log("_passedExercises", _passedExercises);
  console.log("_groupedByUserTrainingCategory", _groupedByTrainingCategory);
  console.log("_passe_groupedByPassedCategorydExercises", _groupedByPassedCategory);
  for (const key in _groupedByTrainingCategory) {
    if (!_groupedByPassedCategory[key]) {
      _groupedByPassedCategory[key] = [];
      console.log("00000000000", key);
      // } else if (_groupedByUserTrainingCategory[key]?.length <= _groupedByPassedCategory[key]?.length) {
    }
    if (_groupedByTrainingCategory[key].length > 1) {
      console.log("1111111111", key);
      const [firstFromTrainingCategory] = _groupedByTrainingCategory[key].splice(0, 1);
      _groupedByPassedCategory[key].push(firstFromTrainingCategory);
    } else if (_groupedByTrainingCategory[key].length === 1) {
      console.log("22222222222", key);
      const [firstFromTrainingCategory] = _groupedByTrainingCategory[key].splice(0, 1);
      const [firstFromPassedCategory] = _groupedByPassedCategory[key].splice(0, 1);
      _groupedByTrainingCategory[key].push(firstFromPassedCategory);
      _groupedByPassedCategory[key].push(firstFromTrainingCategory);
    }

    // _groupedByUserTrainingCategory[key].push(firstExerciseFromPassedByCategory);
    // _groupedByPassedCategory[key].push(firstExerciseFromUserTrainingCategory);

    // console.log(newUserTraining, newPassedExercises);
    // _userTraining.push(firstExerciseFromPassedByCategory);
    // _passedExercises.push(firstExerciseFromUserTrainingCategory);
    // _userTraining = _userTraining.filter((e) => e.id !== firstExerciseFromUserTrainingCategory.id);
    // _passedExercises = _passedExercises.filter((e) => e.id !== firstExerciseFromPassedByCategory.id);
  }
  const testUser = _.flatMap(_groupedByTrainingCategory);
  const testPassed = _.flatMap(_groupedByPassedCategory);
  console.log("testUser", testUser);
  console.log("testPassed", testPassed);

  // return { _userTraining, _passedExercises };
};

// export const checkAllCategories = (_userTraining: IExercise[], _passedExercises: IExercise[]) => {
//   const _groupedByPassedCategory = _.groupBy(_passedExercises, "category");
//   const _groupedByUserTrainingCategory = _.groupBy(_userTraining, "category");
//   for (const key in _groupedByUserTrainingCategory) {
//     if (!_groupedByPassedCategory[key]) {
//       _groupedByPassedCategory[key] = [];
//     }
//     if (_groupedByUserTrainingCategory[key]?.length === _groupedByPassedCategory[key]?.length) {
//     }
//   }
//   return { _userTraining, _passedExercises };

// const [firstExerciseFromPassedByCategory] = _groupedByPassedCategory[key].splice(0, 1);
// _userTraining.push(firstExerciseFromPassedByCategory);
// _passedExercises = _passedExercises.filter((e) => e.id !== firstExerciseFromPassedByCategory.id);
// };
