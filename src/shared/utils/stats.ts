import _ from "lodash";
import { IExercise } from "../../store/TracksState";
import { DateTime } from "luxon";

// get value of day(1-7)
export const getDayFromDate = (date: number) => {
  return DateTime.fromMillis(date).weekday;
};

// get value of week(1-52/53)
export const getWeekFromDate = (date: number) => {
  return DateTime.fromMillis(date).weekNumber;
};

// get value of month(1-12)
export const getMonthFromDate = (date: number) => {
  return DateTime.fromMillis(date).month;
};

// get value of year(2023)
export const getYearFromDate = (date: number) => {
  return DateTime.fromMillis(date).year;
};

export const findExercisesFromLastWeek = (arr: IExercise[]) => {
  const _currentWeek = getWeekFromDate(Date.now()); //(1-52/53)
  const _filteredExercisesByLastWeek = arr.filter((item) => getWeekFromDate(item.date!) === _currentWeek);
  return _filteredExercisesByLastWeek;
};

export const getStatsFromLastWeek = (arr: IExercise[]) => {
  let _newArr = [];
  const _exercisesFromLastWeek = findExercisesFromLastWeek(arr);
  const _changedTimeStamps = _exercisesFromLastWeek.map((e) => ({ ...e, date: getDayFromDate(e.date!) }));
  const _groupedByDays = _.groupBy(_changedTimeStamps, "date");
  for (let i = 0; i < 7; i++) {
    if (!_groupedByDays[i + 1]?.length) {
      _newArr.push(0);
      continue;
    }
    const sum = _groupedByDays[i + 1].reduce((acc, obj) => {
      acc = acc + obj.duration!;
      return acc;
    }, 0);
    _newArr.push(sum);
  }
  return _newArr;
};
