import { NextResponse } from "next/server";
import { API_ENDPOINT } from "@/lib/constants/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const yearMonth = searchParams.get("yearMonth");
  const backendUrl = `${API_ENDPOINT.SCHEDULE}${yearMonth}`;

  const response = await fetch(backendUrl);
  if (!response.ok) return NextResponse.json([]);

  const {
    data: { list },
  } = await response.json();

  return NextResponse.json(list);
}
