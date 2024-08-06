// pages/api/teamdata.ts
import { API_ENDPOINT } from "@/lib/constants/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = await fetch(API_ENDPOINT.DAILY_TEAMDATA, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // 데이터가 배열 형식인지 확인하고 변환
    const teamData = data.data["팀명"];
    if (!Array.isArray(teamData)) {
      throw new Error("Invalid data format");
    }

    return NextResponse.json(teamData, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
