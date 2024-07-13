import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { playerId: string } }
) {
  const { playerId } = params;

  try {
    const response = await fetch(
      `http://server-test-env.eba-ii263meh.us-east-1.elasticbeanstalk.com/predict/homerun/position/${playerId}`,
      {
        method: "GET",
      }
    );

    if (response.status === 404) {
      const data = await response.json();
      return NextResponse.json(
        { error: data.error, message: data.message },
        { status: 404 }
      );
    }

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
