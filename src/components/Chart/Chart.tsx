import React, { useEffect, useState } from "react";
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
  Colors,
} from "chart.js";
import _ from "lodash";
import { Bar, Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";

import { useCombineStates } from "../../store/useCombineStates";
import { testTraining } from "../../shared/constants/test.training";
import {
  getStatsForPeriod,
  firstDayWeek,
  dayTwoWeeksBack,
  dayMonthBack,
  dayThreeMonthsBack,
  daySixMonthsBack,
  dayTwelveMonthsBack,
} from "../../shared/utils/stats";

import "./Chart.css";

const Chart: React.FC = () => {
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
    Colors,
    annotationPlugin
  );
  ChartJS.defaults.font.family = "Arial";
  ChartJS.defaults.color = "#000000";
  ChartJS.defaults.font.size = 14;

  const { chartInterval, savedInHistoryDoneExercises } = useCombineStates();
  const [dateValue, setDateValue] = useState<number>();
  const { durationOfExercisesByDays, generatedDates } = getStatsForPeriod(testTraining, dateValue);
  const averageDuration = durationOfExercisesByDays.reduce((acc, e) => (acc += e), 0) / durationOfExercisesByDays.length;

  useEffect(() => {
    if (chartInterval === "week") setDateValue(firstDayWeek);
    if (chartInterval === "2 weeks") setDateValue(dayTwoWeeksBack);
    if (chartInterval === "month") setDateValue(dayMonthBack);
    if (chartInterval === "3 months") setDateValue(dayThreeMonthsBack);
    if (chartInterval === "6 months") setDateValue(daySixMonthsBack);
    if (chartInterval === "12 months") setDateValue(dayTwelveMonthsBack);
  }, [chartInterval]);

  // const generatedDateToMilliseconds = Date.parse("Thu Nov 16 2023 21:58:08");
  // console.log(generatedDateToMilliseconds);
  // const labelsForWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Bar

  const dataForBar = {
    labels: generatedDates,
    datasets: [
      {
        data: durationOfExercisesByDays,
        backgroundColor: [
          // "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          // "rgba(255, 206, 86, 0.6)",
          // "rgba(75, 192, 192, 0.6)",
          // "rgba(153, 102, 255, 0.6)",
          // "rgba(255, 159, 64, 0.6)",
          // "rgba(245, 78, 142, 0.6)",
        ],
      },
    ],
  };

  //Line

  const dataForLine = {
    labels: generatedDates,
    datasets: [
      {
        data: durationOfExercisesByDays,
        fill: true,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderWidth: 1,
        pointRadius: 0,
        tension: 0.4,
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
    maintainAspectRatio: false,
    // layout: {
    //   padding: {
    //     left: 5,
    //   },
    // },
    // responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        // min: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: chartInterval,
        font: {
          size: 16,
        },
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
            value: averageDuration,
            scaleID: "y",
          },
        ],
      },
      colors: {
        // enabled: true,
        // forceOverride: true,
      },
      // maintainAspectRation: false,
    },
  };

  return (
    <div className="chart">
      {chartInterval === "week" ? (
        <Bar data={dataForBar} options={options as any} />
      ) : (
        <Line data={dataForLine} options={options as any} />
      )}
    </div>
  );
};

export default Chart;
