"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { PostSeasonChance } from "@/components/PostSeasonChance";

Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface TeamData {
  teamName: string;
  recentMatches: Record<string, string>;
}

export default function GamePrediction() {
  const [ktData, setKtData] = useState<TeamData | null>(null);
  const [opponentData, setOpponentData] = useState<TeamData | null>(null);
  const [ktWinProbability, setKtWinProbability] = useState<number | null>(null);
  const [opponentWinProbability, setOpponentWinProbability] = useState<
    number | null
  >(null);
  const [ourTeam, setOurTeam] = useState<string>("KT");
  const [opponent, setOpponent] = useState<string>("KIA");
  const [loading, setLoading] = useState<boolean>(false);
  const [showProbability, setShowProbability] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/teamdata", {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        });
        const result = await response.json();

        if (result && Array.isArray(result)) {
          const ktTeam = result.find(
            (team: any) => team["팀명"] && team["팀명"].trim() === "KT"
          );
          const oppTeam = result.find(
            (team: any) => team["팀명"] && team["팀명"].trim() === opponent
          );

          if (ktTeam) {
            const teamName = ktTeam["팀명"].trim();
            const recentMatches: Record<string, string> = {};

            for (const key in ktTeam) {
              if (key.includes("승-패-무")) {
                const opponent = key.split("(")[0].trim();
                const record = ktTeam[key];
                recentMatches[opponent] = record;
              }
            }
            setKtData({ teamName, recentMatches });
          } else {
            console.error("KT 팀 데이터를 찾을 수 없습니다.");
          }

          if (oppTeam) {
            const teamName = oppTeam["팀명"].trim();
            const recentMatches: Record<string, string> = {};

            for (const key in oppTeam) {
              if (key.includes("승-패-무")) {
                const opponent = key.split("(")[0].trim();
                const record = oppTeam[key];
                recentMatches[opponent] = record;
              }
            }
            setOpponentData({ teamName, recentMatches });
          } else {
            console.error("상대 팀 데이터를 찾을 수 없습니다.");
          }
        } else {
          console.error("Invalid data format", result);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [opponent]);

  const calculateWinProbabilities = () => {
    setLoading(true);

    if (!ktData || !opponentData) {
      setLoading(false);
      return;
    }

    const ktRecord = ktData.recentMatches[opponent];
    const oppRecord = opponentData.recentMatches["KT"];

    const ktStats = parseMatchStats(ktRecord);
    const oppStats = parseMatchStats(oppRecord);

    const totalKtGames = ktStats.wins + ktStats.losses + ktStats.draws;
    const totalOppGames = oppStats.wins + oppStats.losses + oppStats.draws;

    const ktWinProbability =
      totalKtGames === 0 ? 0 : (ktStats.wins / totalKtGames) * 100;
    const oppWinProbability =
      totalOppGames === 0 ? 0 : (oppStats.wins / totalOppGames) * 100;

    setKtWinProbability(ktWinProbability);
    setOpponentWinProbability(oppWinProbability);
    setShowProbability(true);
    setLoading(false);
  };

  const parseMatchStats = (record: string) => {
    if (!record || record === "■") return { wins: 0, losses: 0, draws: 0 };

    const [wins, losses, draws] = record.split("-").map(Number);
    return { wins, losses, draws };
  };

  const getChartData = () => {
    return {
      labels: ["KT", opponent],
      datasets: [
        {
          label: "승리 확률 (%)",
          data: [ktWinProbability ?? 0, opponentWinProbability ?? 0],
          backgroundColor: ["#da0b2d", "#000"],
          borderRadius: 4,
          borderWidth: 1,
          borderColor: "#fffbfb",
        },
      ],
    };
  };

  return (
    <div className="flex flex-col items-center justify-center h-[780px] bg-white p-6 space-y-6">
      <h1 className="text-4xl font-extrabold text-black text-center">
        KT vs {opponent} 승리 확률
      </h1>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
        <div className="flex flex-col w-full md:w-1/2">
          <label htmlFor="ourTeam" className="text-gray-800 font-semibold mb-2">
            우리 팀
          </label>
          <input
            type="text"
            id="ourTeam"
            value={ourTeam}
            readOnly
            className="h-[39px] mt-[1px] px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:ring-red-500 focus:border-red-500 cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label
            htmlFor="opponent"
            className="text-gray-800 font-semibold mb-2"
          >
            상대 팀
          </label>
          <select
            id="opponent"
            value={opponent}
            onChange={(e) => setOpponent(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:ring-red-500 focus:border-red-500"
          >
            {ktData ? (
              Object.keys(ktData.recentMatches).map((opponentTeam) => {
                if (opponentTeam === "KT") return null;
                return (
                  <option key={opponentTeam} value={opponentTeam}>
                    {opponentTeam}
                  </option>
                );
              })
            ) : (
              <option>팀 목록을 불러오는 중입니다</option>
            )}
          </select>
        </div>
      </div>

      <button
        onClick={calculateWinProbabilities}
        className="bg-red-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-red-700 transition-transform transform hover:scale-105"
      >
        확률 보기
      </button>

      {/* 고정된 차트 영역 */}
      <div
        className="mt-6 w-full max-w-3xl relative"
        style={{ height: "340px" }}
      >
        {showProbability ? (
          <Bar
            data={getChartData()}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  grid: {
                    color: "rgba(200, 200, 200, 0.3)", // 연한 회색
                  },
                  ticks: {
                    backdropColor: "rgba(255, 255, 255, 0.5)", // 회색 배경
                    color: "black", // 검은색 글씨
                  },
                },
                x: {
                  grid: {
                    color: "rgba(200, 200, 200, 0.3)", // 연한 회색
                  },
                  ticks: {
                    backdropColor: "rgba(255, 255, 255, 0.418)", // 회색 배경
                    color: "black", // 검은색 글씨
                  },
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return `승리 확률: ${context.raw}%`;
                    },
                  },
                },
              },
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full border border-gray-300 rounded-md">
            <p>확률을 보려면 버튼을 눌러주세요.</p>
          </div>
        )}
      </div>

      <div className="w-full max-w-4xl">
        <PostSeasonChance />
      </div>
    </div>
  );
}
