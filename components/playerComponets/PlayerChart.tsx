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
      // case "포수":
      //   return ["도루저지율", "실책수", "폭투방지율", "어시스트", "수비율"];
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
          color: "red", // 범례 텍스트 색상을 빨간색으로 설정
        },
      },
    },
    layout: {
      padding: 10, // 차트와 캔버스 가장자리 사이의 여백 설정
    },
    scales: {
      r: {
        angleLines: {
          color: "black", // 축 각도 라인 색상 설정
        },
        grid: {
          color: "black", // 축 격자 라인 색상 설정
        },
        pointLabels: {
          color: "gray", // 라벨 텍스트 색상을 검은색으로 설정
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
