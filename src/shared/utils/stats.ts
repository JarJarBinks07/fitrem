import _ from "lodash";
import { IExercise } from "../../store/TracksState";
import { DateTime } from "luxon";

// get value of weekdays(1-7)
const getWeekDayFromDate = (date: number) => {
  return DateTime.fromMillis(date).weekday;
};

// get value of days from month (1 -29/30/31)
const getDaysFromDate = (date: number) => {
  return DateTime.fromMillis(date).day;
};

// get value of week(1-52/53)
const getWeekFromDate = (date: number) => {
  return DateTime.fromMillis(date).weekNumber;
};

// get value of month(1-12)
const getMonthFromDate = (date: number) => {
  return DateTime.fromMillis(date).month;
};

// get value of year(2023)
const getYearFromDate = (date: number) => {
  return DateTime.fromMillis(date).year;
};

//LAST WEEK

const findExercisesFromLastWeek = (arr: IExercise[]) => {
  const _currentWeek = getWeekFromDate(Date.now()); //(1-52/53)
  const _filteredExercisesByLastWeek = arr.filter((item) => getWeekFromDate(item.date!) === _currentWeek);
  return _filteredExercisesByLastWeek;
};

export const getStatsFromLastWeek = (arr: IExercise[]) => {
  let _exercisesDurationByDay = [];
  const _exercisesFromLastWeek = findExercisesFromLastWeek(arr);
  const _changedTimeStamps = _exercisesFromLastWeek.map((e) => ({ ...e, date: getWeekDayFromDate(e.date!) }));
  const _groupedByDays = _.groupBy(_changedTimeStamps, "date");
  for (let i = 0; i < 7; i++) {
    if (!_groupedByDays[i + 1]?.length) {
      _exercisesDurationByDay.push(0);
      continue;
    }
    const sum = _groupedByDays[i + 1].reduce((acc, obj) => {
      acc = acc + obj.duration!;
      return acc;
    }, 0);
    _exercisesDurationByDay.push(sum / 60); // convert duration in minutes
  }
  return _exercisesDurationByDay;
};

//LAST MONTH

const findExercisesFromLastMonth = (arr: IExercise[]) => {
  const _currentMonth = getMonthFromDate(Date.now()); //(1-12)
  const _filteredExercisesByLastMonth = arr.filter((item) => getMonthFromDate(item.date!) === _currentMonth);
  return _filteredExercisesByLastMonth;
};

export const getNumberOfDaysFromThisMonth = () => {
  const currentDate = new Date();
  return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
};

export const getStatsFromLastMonth = (arr: IExercise[]) => {
  let _exercisesDurationByDay = [];
  const _exercisesFromLastMonth = findExercisesFromLastMonth(arr);
  const _changedTimeStamps = _exercisesFromLastMonth.map((e) => ({ ...e, date: getDaysFromDate(e.date!) }));
  const _groupedByDays = _.groupBy(_changedTimeStamps, "date");
  console.log(_changedTimeStamps);
  const daysInMonth = getNumberOfDaysFromThisMonth();
  for (let i = 0; i < daysInMonth; i++) {
    if (!_groupedByDays[i + 1]?.length) {
      _exercisesDurationByDay.push(0);
      continue;
    }
    const sum = _groupedByDays[i + 1].reduce((acc, obj) => {
      acc = acc + obj.duration!;
      return acc;
    }, 0);
    _exercisesDurationByDay.push(sum / 60); // convert duration in minutes
  }
  return _exercisesDurationByDay;
};
