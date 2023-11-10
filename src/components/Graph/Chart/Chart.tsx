import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useCombineStates } from "../../../store/useCombineStates";
import _ from "lodash";
import { ITestTraining, testTraining } from "../../../shared/constants/test.training";
import { DateTime } from "luxon";
import { getStatsFromLastWeek } from "../../../shared/utils/stats";

const Chart: React.FC = () => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const { savedInHistoryDoneExercises } = useCombineStates();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "TEST",
      },
    },
  };
  const formattedDateToMilliseconds = Date.parse("Fri Nov 03 2023 21:58:08");
  console.log(formattedDateToMilliseconds);
  console.log(savedInHistoryDoneExercises);

  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const test = getStatsFromLastWeek(savedInHistoryDoneExercises);
  console.log("getStatsFromLastWeek", test);

  const data = {
    labels,
    datasets: [
      {
        label: "",
        // data: labels.map(() => faker.number.int({ min: 0, max: 30 })),

        data: test,

        backgroundColor: "#8884d8",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default Chart;
