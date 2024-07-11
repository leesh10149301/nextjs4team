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
// Chart.js 모듈을 등록합니다.
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function PlayerChart() {
  const chartData = {
    labels: ["RUN", "HIT", "BB", "RBI", "HR"],
    datasets: [
      {
        label: "팀 점수",
        data: [1, 2, 3, 4, 3],
        borderColor: "white",
        backgroundColor: "red",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "red", // 범례 텍스트 색상을 검은색으로 설정
        },
      },
    },
    layout: {
      padding: 20, // 차트와 캔버스 가장자리 사이의 여백 설정
    },
    scales: {
      r: {
        angleLines: {
          color: "white", // 축 각도 라인 색상 설정
        },
        grid: {
          color: "white", // 축 격자 라인 색상 설정
        },
        pointLabels: {
          color: "white", // 라벨 텍스트 색상을 검은색으로 설정
        },
      },
    },
  };

  return (
    <div className="w-52 bg-inherit flex">
      <Radar data={chartData} options={chartOptions} />
      <Radar data={chartData} options={chartOptions} />
    </div>
  );
}
