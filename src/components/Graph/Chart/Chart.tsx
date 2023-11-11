import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useCombineStates } from "../../../store/useCombineStates";
import _ from "lodash";
import { testTraining } from "../../../shared/constants/test.training";
import { getNumberOfDaysFromThisMonth, getStatsFromLastMonth, getStatsFromLastWeek } from "../../../shared/utils/stats";

const Chart: React.FC = () => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const { savedInHistoryDoneExercises } = useCombineStates();
  const formattedDateToMilliseconds = Date.parse("Thu Nov 30 2023 21:58:08");

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

  //stats for week
  const labelsForWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const durationOfExercisesByDaysFromLastWeek = getStatsFromLastWeek(testTraining);
  //stats for month
  const numbersOFDays = getNumberOfDaysFromThisMonth();
  const labelsForMonth = Array.from({ length: numbersOFDays }, (_, index) => index + 1);
  const durationOfExercisesByDaysFromLastMonth = getStatsFromLastMonth(testTraining);

  const data = {
    labels: labelsForMonth,
    datasets: [
      {
        label: "",
        // data: labels.map(() => faker.number.int({ min: 0, max: 30 })),

        data: durationOfExercisesByDaysFromLastMonth,

        backgroundColor: "#8884d8",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default Chart;
