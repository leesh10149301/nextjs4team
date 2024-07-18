import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { predictPlayerRecordData } from "./helper";

const PredictPlayerChart = ({ predictData }) => {
  const data = {
    labels: predictData.map((d) => d[0]),
    datasets: [
      {
        label: "Prediction",
        data: predictData.map((d) => parseFloat(d[1])),
        backgroundColor: "rgb(192, 0, 0, 0.4)",
        borderColor: "red",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-[500px] h-[400px] flex items-center">
      <Bar data={data} options={options} />
    </div>
  );
};

export default PredictPlayerChart;
