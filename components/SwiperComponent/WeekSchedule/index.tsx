"use client";

import { useState, useEffect, useTransition } from "react";
import { GameArticle } from "./GameArticle";
import { SkeletonGameArticle } from "@/components/skeleton/SkeletonGameArticle";

interface GameArticleOptinalProps {
  homeDecision?: string;
  homeDecisionPitcher?: string;
  homeScore?: number;
  homeStarter?: string;
  visitDecision?: string;
  visitDecisionPitcher?: string;
  visitScore?: number;
  visitStarter?: string;
}

export interface IGameArticleProps extends GameArticleOptinalProps {
  displayDate: string;
  game: "current" | "next" | "prev";
  gameDate: number;
  gday: number;
  gmkey: string;
  gmonth: number;
  gtime: string;
  gyear: string;
  home: string;
  homeFullname: string;
  homeKey: string;
  matchTeamCode: string;
  matchTeamName: string;
  outcome: string;
  stadium: string;
  stadiumKey: string;
  status: string;
  visit: string;
  visitFullname: string;
  visitKey: string;
}

interface IScheduleData {
  data: {
    current: IGameArticleProps;
    next: IGameArticleProps;
    prev: IGameArticleProps;
  };
}

const fetchScheduleData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/get_current_info`
  );
  if (response.ok) {
    const data = await response.json();
    return data as IScheduleData;
  } else {
    throw new Error("Failed to fetch data");
  }
};

function ScheduleComponent() {
  const [schedule, setSchedule] = useState<IScheduleData["data"] | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      fetchScheduleData()
        .then(({ data }) => setSchedule(data))
        .catch((error) => console.error(error));
    });
  }, []);

  if (isPending || !schedule) {
    return <SkeletonGameArticle />;
  }

  return (
    <div className="flex justify-between space-x-4">
      {renderGameArticle({ gameArticle: schedule.prev })}
      {renderGameArticle({ gameArticle: schedule.current })}
      {renderGameArticle({ gameArticle: schedule.next })}
    </div>
  );
}

function renderGameArticle({
  gameArticle,
}: {
  gameArticle: IGameArticleProps;
}) {
  return <GameArticle {...gameArticle} />;
}

export default function WeekSchedule() {
  return <ScheduleComponent />;
}
