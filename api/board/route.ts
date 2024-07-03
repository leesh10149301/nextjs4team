import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

function replacer(key, value) {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
}

export async function POST(req) {
  try {
    const { title, content } = await req.json();

    const post = await prisma.board.create({
      data: {
        title,
        content,
      },
    });

    const postData = JSON.parse(JSON.stringify(post, replacer));
    return NextResponse.json(postData, { status: 200 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: `Error creating post: ${error.message}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    const posts = await prisma.board.findMany();
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
