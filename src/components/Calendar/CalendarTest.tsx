import React, { useEffect, useRef, useState } from "react";
import { IonDatetime } from "@ionic/react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const CalendarTest: React.FC = () => {
  const datetime = useRef<null | HTMLIonDatetimeElement>(null);

  useEffect(() => {
    if (!datetime.current) return;
    datetime.current.value = new Date().toISOString();
  }, []);
  return <IonDatetime ref={datetime} presentation="date" multiple={true} showDefaultButtons={true}></IonDatetime>;
};

export default CalendarTest;

// const CalendarTest: React.FC = () => {
//   const [state, setState] = useState([
//     {
//       startDate: new Date(),
//       endDate: null,
//       key: "selection",
//     },
//   ]);

//   return (
//     <DateRange
//       editableDateInputs={true}
//       onChange={(item) => setState([item.selection as any])}
//       moveRangeOnFirstSelection={false}
//       ranges={state as any}
//     />
//   );
// };

// export default CalendarTest;
