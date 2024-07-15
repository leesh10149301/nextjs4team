"use client";

import { useEffect, useState } from "react";

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
      const response = await fetch("http://3.35.50.52:5002/today_rank");
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
    <div className="h-screen flex flex-col items-center mt-[84px]">
      <iframe
        className="w-full h-2/3 border-none min-h-[500px] mx-auto"
        src="https://www.youtube.com/embed/yCqLhzTVgTs?si=2lA05OiqC4p63lfF&mute=1&autoplay=1"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <div className=" w-full flex justify-center items-center space-x-4 p-4 *:my-[60px] *:h-24">
        {score ? (
          <>
            <div className="flex-1 text-center p-4 bg-red-600 text-white rounded-lg">
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
          <>
            <div className="flex-1 text-center p-4 bg-gray-800 animate-pulse rounded-lg h-24"></div>
            <div className="flex-1 text-center p-4 bg-gray-800 animate-pulse rounded-lg h-24"></div>
            <div className="flex-1 text-center p-4 bg-gray-800 animate-pulse rounded-lg h-24"></div>
            <div className="flex-1 text-center p-4 bg-gray-800 animate-pulse rounded-lg h-24"></div>
            <div className="flex-1 text-center p-4 bg-gray-800 animate-pulse rounded-lg h-24"></div>
          </>
        )}
      </div>
    </div>
  );
}
