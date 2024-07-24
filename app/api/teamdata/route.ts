import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const response = await fetch("http://43.203.217.238:5002/daily_teamdata");
  const data = await response.json();
  return NextResponse.json(data.data["팀명"]);
}
