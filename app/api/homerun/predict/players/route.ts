import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

function replacer(key, value) {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
}

export async function GET() {
  try {
    const homerunPlayerIds = await prisma.homerun_history.findMany({
      select: { player_id: true },
      distinct: ["player_id"],
    });

    const playerIds = homerunPlayerIds.map((record) => record.player_id);
    const players = await prisma.player.findMany({
      where: {
        id: {
          in: playerIds,
        },
      },
    });

    const playersData = JSON.parse(JSON.stringify(players, replacer));
    return NextResponse.json(playersData, { status: 200 });
  } catch (error) {
    console.error("Error fetching players:", error);

    return NextResponse.json(
      { error: `Error fetching players: ${error.message}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
