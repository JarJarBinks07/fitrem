import { faker } from "@faker-js/faker";

export interface ITestTraining {
  "1"?: {
    date: number;
    duration: number;
  }[];
  "2"?: {
    date: number;
    duration: number;
  }[];
  "3"?: {
    date: number;
    duration: number;
  }[];
  "4"?: {
    date: number;
    duration: number;
  }[];
  "5"?: {
    date: number;
    duration: number;
  }[];
  "6"?: {
    date: number;
    duration: number;
  }[];
  "7"?: {
    date: number;
    duration: number;
  }[];
}

// export const testTraining = [
//   {
//     date: 1699300688000, //Mon Nov 06 2023 21:58:08
//     duration: 30,
//   },
//   {
//     date: 1699300688000, //Mon Nov 06 2023 21:58:08
//     duration: 25,
//   },
//   {
//     date: 1699300688000, //Mon Nov 06 2023 21:58:08
//     duration: 10,
//   },
//   {
//     date: 1699300688000, //Mon Nov 06 2023 21:58:08
//     duration: 45,
//   },
//   {
//     date: 1699300688000, //Mon Nov 06 2023 21:58:08
//     duration: 30,
//   },
//   {
//     date: 1699387088000, //Tue Nov 07 2023 21:58:08
//     duration: 10,
//   },
//   {
//     date: 1699387088000, //Tue Nov 07 2023 21:58:08
//     duration: 45,
//   },
//   {
//     date: 1699387088000, //Tue Nov 07 2023 21:58:08
//     duration: 45,
//   },
//   {
//     date: 1699387088000, //Tue Nov 07 2023 21:58:08
//     duration: 30,
//   },
//   {
//     date: 1699473488000, //Wed Nov 08 2023 21:58:08
//     duration: 25,
//   },
//   {
//     date: 1699473488000, //Wed Nov 08 2023 21:58:08
//     duration: 40,
//   },
//   {
//     date: 1699473488000, //Wed Nov 08 2023 21:58:08
//     duration: 15,
//   },
//   {
//     date: 1699559888000, //Thu Nov 09 2023 21:58:08
//     duration: 15,
//   },
//   {
//     date: 1699559888000, //Thu Nov 09 2023 21:58:08
//     duration: 25,
//   },
//   {
//     date: 1699559888000, //Thu Nov 09 2023 21:58:08
//     duration: 40,
//   },
//   {
//     date: 1699559888000, //Thu Nov 09 2023 21:58:08
//     duration: 60,
//   },
//   {
//     date: 1699559888000, //Thu Nov 09 2023 21:58:08
//     duration: 10,
//   },
//   {
//     date: 1699646288000, //Fri Nov 10 2023 21:58:08
//     duration: 60,
//   },
//   {
//     date: 1699646288000, //Fri Nov 10 2023 21:58:08
//     duration: 60,
//   },
//   {
//     date: 1699646288000, //Fri Nov 10 2023 21:58:08
//     duration: 50,
//   },
//   {
//     date: 1699732688000, //Sat Nov 11 2023 21:58:08
//     duration: 45,
//   },
//   {
//     date: 1699732688000, //Sat Nov 11 2023 21:58:08
//     duration: 25,
//   },
//   {
//     date: 1699732688000, //Sat Nov 11 2023 21:58:08
//     duration: 30,
//   },
//   {
//     date: 1699819088000, //Sun Nov 12 2023 21:58:08
//     duration: 50,
//   },
//   {
//     date: 1699819088000, //Sun Nov 12 2023 21:58:08
//     duration: 20,
//   },
//   {
//     date: 1699819088000, //Sun Nov 12 2023 21:58:08
//     duration: 40,
//   },
// ];

//////////////
const randomDuration = faker.number.int({ min: 0, max: 60 });
export const testTraining = [
  {
    date: 1699300688000, //Mon Nov 06 2023 21:58:08
    duration: randomDuration,
  },
  {
    date: 1699300688000, //Mon Nov 06 2023 21:58:08
    duration: randomDuration,
  },
  {
    date: 1699300688000, //Mon Nov 06 2023 21:58:08
    duration: randomDuration,
  },
  {
    date: 1699300688000, //Mon Nov 06 2023 21:58:08
    duration: randomDuration,
  },
  {
    date: 1699300688000, //Mon Nov 06 2023 21:58:08
    duration: randomDuration,
  },
  {
    date: 1699387088000, //Tue Nov 07 2023 21:58:08
    duration: randomDuration,
  },
  {
    date: 1699387088000, //Tue Nov 07 2023 21:58:08
    duration: randomDuration,
  },
  {
    date: 1699387088000, //Tue Nov 07 2023 21:58:08
    duration: randomDuration,
  },
  {
    date: 1699387088000, //Tue Nov 07 2023 21:58:08
    duration: randomDuration,
  },
  {
    date: 1699473488000, //Wed Nov 08 2023 21:58:08
    duration: randomDuration,
  },
  {
    date: 1699473488000, //Wed Nov 08 2023 21:58:08
    duration: randomDuration,
  },
  {
    date: 1699473488000, //Wed Nov 08 2023 21:58:08
    duration: randomDuration,
  },
  {
    date: 1699559888000, //Thu Nov 09 2023 21:58:08
    duration: randomDuration,
  },
  {
    date: 1699559888000, //Thu Nov 09 2023 21:58:08
    duration: randomDuration,
  },
  {
    date: 1699559888000, //Thu Nov 09 2023 21:58:08
    duration: randomDuration,
  },
  {
    date: 1699559888000, //Thu Nov 09 2023 21:58:08
    duration: randomDuration,
  },
  {
    date: 1699559888000, //Thu Nov 09 2023 21:58:08
    duration: randomDuration,
  },
  {
    // date: 1699646288000, //Fri Nov 10 2023 21:58:08
    date: 1699041488000, //"Fri Nov 03 2023 21:58:08"
    duration: randomDuration,
  },
  {
    // date: 1699646288000, //Fri Nov 10 2023 21:58:08
    date: 1699041488000, //"Fri Nov 03 2023 21:58:08"
    duration: randomDuration,
  },
  {
    // date: 1699646288000, //Fri Nov 10 2023 21:58:08
    date: 1699041488000, //"Fri Nov 03 2023 21:58:08"
    duration: randomDuration,
  },
  {
    date: 1699732688000, //Sat Nov 11 2023 21:58:08
    duration: randomDuration,
  },
  {
    date: 1699732688000, //Sat Nov 11 2023 21:58:08
    duration: randomDuration,
  },
  {
    date: 1699732688000, //Sat Nov 11 2023 21:58:08
    duration: randomDuration,
  },
  {
    date: 1699819088000, //Sun Nov 12 2023 21:58:08
    duration: randomDuration,
  },
  {
    date: 1699819088000, //Sun Nov 12 2023 21:58:08
    duration: randomDuration,
  },
  {
    date: 1699819088000, //Sun Nov 12 2023 21:58:08
    duration: randomDuration,
  },
];
