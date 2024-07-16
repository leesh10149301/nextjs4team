"use client";

import React, { Suspense, useState, useEffect, useTransition } from "react";
import { GameArticle } from "./GameArticle";
import { SkeletonGameArticle } from "@/components/skeleton/SkeletonGameArticle";

interface IGameArticleProps {
  game: "current" | "next" | "prev";
  displayDate: string;
  home: string;
  homeKey: string;
  homeStarter: string;
  homeScore?: number;
  outcome: string;
  visit: string;
  visitKey: string;
  visitScore?: number;
  visitStarter: string;
}

interface IScheduleData {
  data: {
    current: IGameArticleProps;
    next: IGameArticleProps;
    prev: IGameArticleProps;
  };
}

const fetchScheduleData = async () => {
  const response = await fetch("http://3.35.50.52:5002/get_current_info");
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
  return (
    <GameArticle
      game={gameArticle.game}
      displayDate={gameArticle.displayDate}
      home={gameArticle.home}
      homeKey={gameArticle.homeKey}
      homeStarter={gameArticle.homeStarter}
      homeScore={gameArticle.homeScore}
      outcome={gameArticle.outcome}
      visit={gameArticle.visit}
      visitKey={gameArticle.visitKey}
      visitScore={gameArticle.visitScore}
      visitStarter={gameArticle.visitStarter}
    />
  );
}

export default function WeekSchedule() {
  return <ScheduleComponent />;
}
