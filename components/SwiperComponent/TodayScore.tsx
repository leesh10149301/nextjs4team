"use client";

import { useEffect, useState } from "react";
import { SkeletonTodayScore } from "../skeleton/SkeletonTodayScore";
import { API_ENDPOINT } from "@/lib/constants/api";

interface Score {
  rank: number;
  game: number;
  win: number;
  defeat: number;
  draw: number;
}

interface ITodayScoreProps {}
export default function TodayScore(props: ITodayScoreProps) {
  const [score, setScore] = useState<Score | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_ENDPOINT.TODAY_RANK);
      if (response.ok) {
        const data = await response.json();
        const ktScore = data.filter((d) => d.팀 === "KT")[0];
        const record: Score = {
          rank: ktScore.순위,
          game: ktScore.G,
          win: ktScore.승,
          defeat: ktScore.패,
          draw: ktScore.무,
        };

        setScore(record);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="h-screen flex flex-col items-center py-4">
      <div className="w-full flex justify-center items-center space-x-4 p-4 *:h-24">
        {score ? (
          <>
            <div className="flex-1 text-center p-4 bg-[#ec0a0b] text-white rounded-lg">
              <div className="text-lg">순위</div>
              <div className="text-2xl font-bold">{score.rank}</div>
            </div>
            <div className="flex-1 text-center p-4 bg-black text-white rounded-lg">
              <div className="text-lg">경기</div>
              <div className="text-2xl font-bold">{score.game}</div>
            </div>
            <div className="flex-1 text-center p-4 bg-black text-white rounded-lg">
              <div className="text-lg">승</div>
              <div className="text-2xl font-bold">{score.win}</div>
            </div>
            <div className="flex-1 text-center p-4 bg-black text-white rounded-lg">
              <div className="text-lg">패</div>
              <div className="text-2xl font-bold">{score.defeat}</div>
            </div>
            <div className="flex-1 text-center p-4 bg-black text-white rounded-lg">
              <div className="text-lg">무</div>
              <div className="text-2xl font-bold">{score.draw}</div>
            </div>
          </>
        ) : (
          <SkeletonTodayScore />
        )}
      </div>
    </div>
  );
}
