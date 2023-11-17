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
