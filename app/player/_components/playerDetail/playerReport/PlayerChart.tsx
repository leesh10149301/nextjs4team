"use client";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function PlayerChart({
  talentData,
  position,
}: {
  talentData: (string | Number)[];
  position: string;
}) {
  const getLabels = (position: string) => {
    switch (position) {
      case "투수":
        return ["평균자책점", "탈삼진", "볼넷", "피안타율", "출루허용률"];

      default:
        return ["득점", "장타율", "출루율", "타율", "홈런"];
    }
  };
  const chartData = {
    labels: getLabels(position),
    datasets: [
      {
        label: "talent",
        data: talentData,
        borderColor: "red",
        backgroundColor: "rgb(192, 0, 0, 0.4)",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "red",
        },
      },
    },
    layout: {
      padding: 10,
    },
    scales: {
      r: {
        angleLines: {
          color: "black",
        },
        grid: {
          color: "black",
        },
        pointLabels: {
          color: "gray",
        },
      },
    },
  };

  return (
    <div className="w-[500px] h-[400px]">
      <Radar data={chartData} options={chartOptions} />
    </div>
  );
}
