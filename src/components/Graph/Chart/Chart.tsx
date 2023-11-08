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
        display: false,
      },
      title: {
        display: true,
        text: "TEST",
      },
    },
  };

  const labels = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: labels.map(() => faker.number.int({ min: 0, max: 30 })),

        // data: [10, 20, 30, 10, 40, 50, 20],

        backgroundColor: "#8884d8",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default Chart;
