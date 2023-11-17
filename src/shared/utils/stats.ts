import _ from "lodash";
import { IExercise } from "../../store/TracksState";
import { DateTime } from "luxon";

// get value of weekdays(1-7)
const getWeekDay = (date: number) => {
  return DateTime.fromMillis(date).weekday;
};

// get value of days from month (1 -29/30/31)
const getDay = (date: number) => {
  return DateTime.fromMillis(date).day;
};

// get value of week(1-52/53)
const getWeekNumber = (date: number) => {
  return DateTime.fromMillis(date).weekNumber;
};

// get value of month(1-12)
const getMonth = (date: number) => {
  return DateTime.fromMillis(date).month;
};

// get value of year(2023)
const getYear = (date: number) => {
  return DateTime.fromMillis(date).year;
};

const getFirstDayOfWeek = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const firstDay = new Date(now.setDate(diff));
  return +firstDay;
};

const getCustomDay = (value: number) => {
  const now = new Date();
  return now.setMonth(now.getMonth() - value);
};

export const firstDayWeek = getFirstDayOfWeek();
export const dayTwoWeeksBack = Date.now() - 14 * 24 * 60 * 60 * 1000;
export const dayMonthBack = getCustomDay(1);
export const dayThreeMonthsBack = getCustomDay(3);
export const daySixMonthsBack = getCustomDay(6);
export const dayTwelveMonthsBack = getCustomDay(12);
const currentDate = new Date();
const millisInMonth = 30 * 24 * 60 * 60 * 1000;

const convertedDate = (date: Date) => {
  // if (currentDate.getTime() - date.getTime() >= millisInMonth)
  //   return date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" }).replace(/\//g, ".");
  // return date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" }).replace(/\//g, ".");
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" }).replace(/\//g, ".");
};
const generateDatesForPeriod = (date: number) => {
  const _datesArray = [];
  let _previousDate = new Date(date);
  // const currentDate = new Date();
  while (_previousDate <= currentDate) {
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
  console.log(generatedDates);
  console.log(_groupedByDays);
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
  console.log(durationOfExercisesByDays);
  return { durationOfExercisesByDays, generatedDates };
};
