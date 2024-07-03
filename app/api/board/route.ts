import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

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

// 수정
export async function PUT(req: NextRequest, { params }) {
  const { id } = params;

  try {
    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const updatedPost = await prisma.board.update({
      where: { id: parseInt(id, 10) },
      data: { title, content },
    });

    const updatedPostData = JSON.parse(JSON.stringify(updatedPost, replacer));
    return NextResponse.json(updatedPostData, { status: 200 });
  } catch (error) {
    console.log("Error updating post:", error);
    return NextResponse.json(
      { error: `Error updating post: ${error.message}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// 삭제
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.board.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: `Error deleting post: ${error.message}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
