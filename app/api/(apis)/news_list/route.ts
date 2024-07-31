import { NextResponse } from "next/server";
import { API_ENDPOINT } from "@/lib/constants/api";

export async function GET(request: Request) {
  const backendUrl = `${API_ENDPOINT.NEWS_LIST}`;

  try {
    const response = await fetch(backendUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }

    const {
      data: { list },
    } = await response.json();

    return NextResponse.json(list);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
