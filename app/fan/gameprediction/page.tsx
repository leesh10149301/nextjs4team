"use client";

import { useEffect, useState } from "react";

interface TeamData {
  teamName: string;
  recentMatches: Record<string, string>;
}

export default function gamePrediction() {
  const [ktData, setKtData] = useState<TeamData | null>(null);
  const [ktWinProbability, setKtWinProbability] = useState<number | null>(null);
  const [opponent, setOpponent] = useState<string>("KIA");
  const [loading, setLoading] = useState<boolean>(false);
  const [showProbability, setShowProbability] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/teamdata");
        const result = await response.json();

        if (result && Array.isArray(result)) {
          const ktTeam = result.find(
            (team: any) => team["팀명"].trim() === "KT"
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
            const formattedKtData = { teamName, recentMatches };
            setKtData(formattedKtData);
          } else {
            console.error("KT 팀 데이터를 찾을 수 없습니다.");
          }
        } else {
          // data 형식 유효하지 않은 경우
          console.error("Invalid data format");
        }
      } catch (error) {
        // data 가져오기 중 오류가 발생한 경우
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const calculateWinProbability = () => {
    setLoading(true);

    if (!ktData) {
      setLoading(false);
      return;
    }

    const ktRecord = ktData.recentMatches[opponent];

    if (!ktRecord) {
      setLoading(false);
      return;
    }

    const ktStats = parseMatchStats(ktRecord);

    const totalGames = ktStats.wins + ktStats.losses + ktStats.draws;
    const winProbability =
      totalGames === 0 ? 0 : (ktStats.wins / totalGames) * 100;

    setKtWinProbability(winProbability);
    setShowProbability(true);
    setLoading(false);
  };

  const parseMatchStats = (record: string) => {
    if (!record || record === "■") return { wins: 0, losses: 0, draws: 0 };

    const [wins, losses, draws] = record.split("-").map(Number);
    return { wins, losses, draws };
  };

  return (
    <div className="min-h-[710px] bg-gradient-to-br flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-lg w-full transform transition-all border-t-8 border-red-600 h-80">
        <h1 className="text-4xl font-extrabold text-center text-red-600 mb-6 drop-shadow-lg">
          KT wiz 경기 예측
        </h1>
        <div className="mb-4">
          <label
            htmlFor="opponent"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            상대 팀 선택
          </label>
          <select
            id="opponent"
            value={opponent}
            onChange={(e) => setOpponent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 transition duration-300"
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
        <button
          onClick={calculateWinProbability}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300 transform hover:scale-105"
        >
          확률보기
        </button>
        {showProbability && (
          <h2 className="text-2xl font-semibold text-center text-gray-800 mt-6">
            KT의 승리 확률:{" "}
            {loading ? (
              <span className="animate-spin text-red-600">⚾</span>
            ) : ktWinProbability !== null ? (
              `${ktWinProbability.toFixed(2)}%`
            ) : (
              ""
            )}
          </h2>
        )}
      </div>
    </div>
  );
}
