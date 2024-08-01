import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { API_ENDPOINT } from "@/lib/constants/api";
import { IGameArticleProps } from "@/components/SwiperComponent/WeekSchedule";

interface IScheduleData {
  data: {
    current: IGameArticleProps;
    next: IGameArticleProps;
    prev: IGameArticleProps;
  };
}

export async function GET(request: NextRequest) {
  const backendUrl = `${API_ENDPOINT.CURRENT_INFO}`;

  try {
    const response = await fetch(backendUrl, {
      cache: "no-store",
    });
    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data as IScheduleData);
    } else {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
