import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  BarChart,
  Bar,
} from "recharts";
import { faker } from "@faker-js/faker";

import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import "./ProfileChart.css";
// import { getRechartAppUseDataForDays } from "../../selectors/stats-selector";

const ProfileChart: React.FC = () => {
  const [dataSet, setDataSet] = useState([20, 35, 24, 10, 25, 25, 32]);
  const [averageExerciseCount, setAverageExerciseCount] = useState([10]);
  const [daysToDisplay, setDaysToDisplay] = useState(7);
  //   ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]

  //   useEffect(() => {
  //     getRechartAppUseDataForDays(daysToDisplay)
  //       .then((res) => {
  //         if (res) {
  //           setDataSet(res.data);
  //           setAverageExerciseCount(res.average);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("------ Didn't get the data...", err);
  //       });

  //   }, [daysToDisplay]);

  const toggleDaysHandler = () => {
    setDaysToDisplay(daysToDisplay === 7 ? 30 : 7);

    const labels = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  };

  return (
    <IonCard className="chart__card">
      <IonCardHeader>
        <IonCardSubtitle>Your recent app use</IonCardSubtitle>
        <IonCardTitle>Last {daysToDisplay} Days</IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="ion-no-padding">
        <div style={{ width: "100%", height: "200px" }}>
          <ResponsiveContainer>
            <BarChart
              data={dataSet}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="0 0" />
              <XAxis dataKey="name" tick={dataSet.length < 8 ? { fontSize: 12 } : { fontSize: 10 }} />
              <YAxis tick={{ fontSize: 8 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" barSize={Math.floor(220 / dataSet.length)} />
              <ReferenceLine y={averageExerciseCount} stroke="lightgreen" strokeDasharray="0" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <IonCardSubtitle className="ion-padding">Average exercise count: {averageExerciseCount}</IonCardSubtitle>
        <IonButton
          className="chart__btn"
          size="small"
          shape="round"
          onClick={toggleDaysHandler}
          color={daysToDisplay === 7 ? "primary" : "light"}
        >
          7 Days
        </IonButton>
        <IonButton
          className="chart__btn"
          size="small"
          shape="round"
          onClick={toggleDaysHandler}
          color={daysToDisplay === 30 ? "primary" : "light"}
        >
          30 Days
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default ProfileChart;
