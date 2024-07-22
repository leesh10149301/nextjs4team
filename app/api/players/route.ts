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
    const posts = await prisma.player.findMany();
    const postsData = JSON.parse(JSON.stringify(posts, replacer));
    return NextResponse.json(postsData, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: `Error fetching posts: ${error.message}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
