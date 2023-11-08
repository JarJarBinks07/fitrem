import React, { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";

const Recharts: React.FC = () => {
  //   const [dataSet, setDataSet] = useState<any>([10, 20, 30, 40, 100]);
  //   const [averageExerciseCount, setAverageExerciseCount] = useState(10);
  //   const [daysToDisplay, setDaysToDisplay] = useState(7);

  //   const toggleDaysHandler = () => {
  //     setDaysToDisplay(daysToDisplay === 7 ? 30 : 7);
  //   };
  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 400, pv: 2400, amt: 2400 },
  ];

  return (
    <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
    // <IonCard>
    //   <IonCardHeader>
    //     <IonCardSubtitle>Your recent app use</IonCardSubtitle>
    //     <IonCardTitle>Last {daysToDisplay} Days</IonCardTitle>
    //   </IonCardHeader>
    //   <IonCardContent className="ion-no-padding">
    //     <div style={{ width: "100%", height: 230 }}>
    //       <ResponsiveContainer>
    //         <BarChart
    //           data={dataSet}
    //           margin={{
    //             top: 10,
    //             right: 30,
    //             left: 0,
    //             bottom: 0,
    //           }}
    //         >
    //           <CartesianGrid strokeDasharray="0 0" />
    //           <XAxis dataKey="name" tick={dataSet.length < 8 ? { fontSize: 12 } : { fontSize: 10 }} />
    //           <YAxis tick={{ fontSize: 8 }} />
    //           <Tooltip />
    //           <Bar dataKey="count" fill="#8884d8" barSize={Math.floor(220 / dataSet.length)} />
    //           <ReferenceLine y={averageExerciseCount} stroke="lightgreen" strokeDasharray="0" />
    //         </BarChart>
    //       </ResponsiveContainer>
    //     </div>
    //     <IonCardSubtitle className="ion-padding">Average exercise count: {averageExerciseCount}</IonCardSubtitle>
    //     <IonButton size="small" shape="round" onClick={toggleDaysHandler} color={daysToDisplay === 7 ? "primary" : "light"}>
    //       7 Days
    //     </IonButton>
    //     <IonButton size="small" shape="round" onClick={toggleDaysHandler} color={daysToDisplay === 30 ? "primary" : "light"}>
    //       30 Days
    //     </IonButton>
    //     {/* <IonButton size="small" shape="round" color="light">Active</IonButton> */}
    //   </IonCardContent>
    // </IonCard>
  );
};

export default Recharts;
