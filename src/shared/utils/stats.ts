import _ from "lodash";
import { IExercise } from "../../store/TracksState";

const getFirstDayOfWeek = () => {
  const _currentDate = new Date();
  const _dayOfWeek = _currentDate.getDay();
  const _diff = _currentDate.getDate() - _dayOfWeek + (_dayOfWeek === 0 ? -6 : 1);
  const _firstDay = new Date(_currentDate.setDate(_diff));
  return +_firstDay;
};

const getCustomDay = (value: number) => {
  const _currentDate = new Date();
  return _currentDate.setMonth(_currentDate.getMonth() - value);
};

export const firstDayWeek = getFirstDayOfWeek();
export const dayTwoWeeksBack = Date.now() - 14 * 24 * 60 * 60 * 1000;
export const dayMonthBack = getCustomDay(1);
export const dayThreeMonthsBack = getCustomDay(3);
export const daySixMonthsBack = getCustomDay(6);
export const dayTwelveMonthsBack = getCustomDay(12);

const convertedDate = (date: Date) => {
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" }).replace(/\//g, ".");
};

const generateDatesForPeriod = (date: number) => {
  const _datesArray = [];
  const _currentDate = new Date();
  let _previousDate = new Date(date);
  while (_previousDate <= _currentDate) {
    _datesArray.push(convertedDate(_previousDate));
    _previousDate.setDate(_previousDate.getDate() + 1);
  }
  return _datesArray; // ["12.10", "13.10".....]
};

export const getStatsForPeriod = (arr: IExercise[], date: number) => {
  let durationOfExercisesByDays = [];
  const generatedDates = generateDatesForPeriod(date);
  const _changedExercisesForPeriod = [...arr]
    .filter((e) => e.date! >= date)
    .map((e) => ({ ...e, date: convertedDate(new Date(e.date!)) }));
  const _groupedByDays = _.groupBy(_changedExercisesForPeriod, "date");
  for (let key of generatedDates) {
    if (!_groupedByDays[key]) {
      durationOfExercisesByDays.push(0);
      continue;
    }
    const sum = _groupedByDays[key].reduce((acc, obj) => {
      acc = acc + obj.duration!;
      return acc;
    }, 0);
    durationOfExercisesByDays.push(Math.ceil(sum / 60));
  }
  return { durationOfExercisesByDays, generatedDates };
};
