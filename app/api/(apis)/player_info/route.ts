import { NextResponse } from "next/server";
import { API_ENDPOINT } from "@/lib/constants/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pcode = searchParams.get("pcode");
  const response = await fetch(`${API_ENDPOINT.PLAYER_INFO}${pcode}`);

  const data = await response.json();
  return NextResponse.json(data);
}
