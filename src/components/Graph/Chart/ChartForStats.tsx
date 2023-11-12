import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  Filler,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import _ from "lodash";
import { useCombineStates } from "../../../store/useCombineStates";
import { testTraining } from "../../../shared/constants/test.training";
import { getNumberOfDaysFromThisMonth, getStatsFromLastMonth, getStatsFromLastWeek } from "../../../shared/utils/stats";

interface IProps {
  type: "bar" | "line";
}

const ChartForStats: React.FC<IProps> = ({ type }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    annotationPlugin
  );

  const { savedInHistoryDoneExercises } = useCombineStates();
  const formattedDateToMilliseconds = Date.parse("Thu Nov 30 2023 21:58:08");
  const title = new Date().toString().split(" ")[1];

  //stats for week
  const labelForWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const durationOfExercisesByDaysFromLastWeek = getStatsFromLastWeek(testTraining);
  const numberOfActiveDaysFromLastWeek = [...durationOfExercisesByDaysFromLastWeek].filter((e) => e !== 0).length;
  const averageDurationFromWeek =
    durationOfExercisesByDaysFromLastWeek.reduce((acc, el) => (acc += el)) / numberOfActiveDaysFromLastWeek;

  //stats for month
  const numbersOFDays = getNumberOfDaysFromThisMonth();
  const labelForMonth = Array.from({ length: numbersOFDays }, (_, index) => (index + 1).toString());
  const durationOfExercisesByDaysFromLastMonth = getStatsFromLastMonth(testTraining);
  const numberOfActiveDaysFromLastMonth = [...durationOfExercisesByDaysFromLastMonth].filter((e) => e !== 0).length;
  const averageDurationFromMonth =
    durationOfExercisesByDaysFromLastMonth.reduce((acc, el) => (acc += el)) / numberOfActiveDaysFromLastMonth;

  // Bar

  const dataForBar = {
    labels: labelForWeek,
    datasets: [
      {
        data: durationOfExercisesByDaysFromLastWeek,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(245, 78, 142, 0.6)",
        ],
        // data: labels.map(() => faker.number.int({ min: 0, max: 30 })),
      },
    ],
  };

  //Line
  const dataForLine = {
    labels: labelForMonth,
    datasets: [
      {
        data: durationOfExercisesByDaysFromLastMonth,
        fill: true,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderWidth: 1,
        pointRadius: 1,
        tension: 0.4,
        // data: labels.map(() => faker.number.int({ min: 0, max: 30 })),
      },
    ],
  };

  const annotation = {
    type: "line" as const,
    scaleID: "y",
    borderWidth: 3,
    borderColor: "",
    value: 2,
    label: {
      rotation: "auto",
      content: "Line at x=5",
      enabled: true,
    },
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
      annotation: {
        annotations: [
          {
            type: "line" as const,
            drawTime: "afterDatasetsDraw",
            borderColor: "#ffc409",
            borderDash: [10, 3],
            borderWidth: 2,
            mode: "vertical",
            value: type === "bar" ? averageDurationFromWeek : averageDurationFromMonth,
            scaleID: "y",
          },
        ],
      },
      // maintainAspectRation: false,
    },
  };

  return (
    <div>
      {/* <Chart type={type} data={type === "bar" ? dataForBar : dataForLine} options={options as any} /> */}

      {type === "bar" ? (
        <Chart type="bar" data={dataForBar} options={options as any} />
      ) : (
        <Chart type="line" data={dataForLine} options={options as any} />
      )}
    </div>
  );
};

export default ChartForStats;
