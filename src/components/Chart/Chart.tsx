import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

const Chart: React.FC = () => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "",
      },
    },
  };

  const labels = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

  const data = {
    labels,
    datasets: [
      {
        label: "Minutes per day",
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: "#8884d8",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default Chart;
