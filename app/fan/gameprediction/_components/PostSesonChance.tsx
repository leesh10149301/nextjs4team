import calculateTeamStats from "@/lib/utils/calculateTeamStates";
import { useEffect, useState } from "react";

type TeamStats = {
  teamName: string;
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
  remainingGames: number;
  rank?: number;
};

export function PostSeasonChance() {
  const [teamStats, setTeamStats] = useState<TeamStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/teamdata");
      const data = await response.json();
      const stats = calculateTeamStats(data);
      setTeamStats(stats);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const calculatePlayoffProbability = (team: TeamStats): number => {
    const { winRate, remainingGames } = team;

    // 승률과 남은 경기 수를 바탕으로 확률 계산
    const baseProbability = winRate * 100;
    const remainingGamesImpact = (remainingGames / 144) * 50; // 남은 경기 수의 영향을 반영

    const probability = baseProbability + remainingGamesImpact;
    return Math.min(100, Math.max(0, probability));
  };

  const ktTeam = teamStats.find((team) => team.teamName === "KT");
  const ktProbability = ktTeam ? calculatePlayoffProbability(ktTeam) : 0;

  // 순위
  const sortedTeams = [...teamStats].sort((a, b) => b.winRate - a.winRate);
  sortedTeams.forEach((team, index) => {
    team.rank = index + 1;
  });

  return (
    <div className="flex justify-center items-center w-full mt-6">
      <div className="flex flex-row justify-between items-center w-full max-w-4xl p-4 bg-white border border-gray-300 rounded-md shadow-sm">
        <div className="flex flex-col items-center text-sm mx-2">
          <p className="text-black font-semibold">현재 순위</p>
          <p className="text-black">{ktTeam?.rank}</p>
        </div>
        <div className="flex flex-col items-center text-sm mx-2">
          <p className="text-black font-semibold">현재 승률</p>
          <p className="text-black">{ktTeam?.winRate.toFixed(2)}</p>
        </div>
        <div className="flex flex-col items-center text-sm mx-2">
          <p className="text-black font-semibold">남은 경기 수</p>
          <p className="text-black">{ktTeam?.remainingGames}</p>
        </div>
        <div className="flex flex-col items-center text-sm mx-2">
          <p className="text-red-600 font-semibold">가을 야구 진출 확률</p>
          <p className="text-black">{ktProbability.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
}
