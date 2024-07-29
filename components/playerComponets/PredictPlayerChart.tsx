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

const PredictPlayerChart = ({ predictData, position }) => {
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
    <div className="w-[500px] h-[400px] flex flex-col justify-center items-center">
      <Bar data={data} options={options} />
      <span className="mt-5 text-xs text-gray-400">
        {position === "투수"
          ? "ERA: 자책점 WHIP: 출루율 K/BB: 삼진/볼넷 OBA: 피안타율"
          : "BA: 타율 OBP: 출루율 SLG: 장타율 HR: 홈런 "}
      </span>
    </div>
  );
};

export default PredictPlayerChart;
