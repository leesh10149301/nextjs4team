import { API_ENDPOINT } from "@/lib/constants/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const yearMonth = searchParams.get("yearMonth");
  try {
    const response = await fetch(`${API_ENDPOINT.SCHEDULE}${yearMonth}`, {
      cache: "no-store",
    });

    const {
      data: { list },
    } = await response.json();
    return NextResponse.json(list);
  } catch (error) {
    return;
  }
}
