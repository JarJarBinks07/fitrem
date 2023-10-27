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
  const _groupedByUserTrainingCategory = _.groupBy(_userTraining, "category");
  for (const key in _groupedByUserTrainingCategory) {
    if (!_groupedByPassedCategory[key]) {
      _groupedByPassedCategory[key] = [];
    } else if (_groupedByUserTrainingCategory[key]?.length <= _groupedByPassedCategory[key]?.length) {
      const [firstExerciseFromPassedByCategory] = _groupedByPassedCategory[key].splice(0, 1);
      _userTraining.push(firstExerciseFromPassedByCategory);
      _passedExercises = _passedExercises.filter((e) => e.id !== firstExerciseFromPassedByCategory.id);
    }
  }

  return { _userTraining, _passedExercises };
  // return { _userTraining };
};
