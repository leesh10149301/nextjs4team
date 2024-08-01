import { NextResponse } from "next/server";
import { API_ENDPOINT } from "@/lib/constants/api";

interface Score {
  rank: number;
  game: number;
  win: number;
  defeat: number;
  draw: number;
  winRate: number;
  gamesBehind: number;
}

export async function GET() {
  const response = await fetch(API_ENDPOINT.TODAY_RANK, {
    cache: "no-store",
  });
  if (response.ok) {
    const data = await response.json();
    const ktScore = data.filter((d: any) => d.팀 === "KT")[0];
    const record: Score = {
      rank: ktScore.순위,
      game: ktScore.G,
      win: ktScore.승,
      defeat: ktScore.패,
      draw: ktScore.무,
      winRate: ktScore.승률,
      gamesBehind: ktScore.승차,
    };
    return NextResponse.json(record);
  }
}
