import { NextResponse } from "next/server";
import { API_ENDPOINT } from "@/lib/constants/api";

export async function GET(request: Request) {
  const backendUrl = `${API_ENDPOINT.NEWS_LIST}`;

  const response = await fetch(backendUrl);

  const {
    data: { list },
  } = await response.json();

  return NextResponse.json(list);
}
