import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

function replacer(key, value) {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
}

// GET 메서드
export async function GET(req, { params }) {
  const { id } = params;

  try {
    const post = await prisma.board.findUnique({
      where: { id: id },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const postData = JSON.parse(JSON.stringify(post, replacer));
    return NextResponse.json(postData, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: `Error fetching post: ${error.message}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT 메서드
export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const body = await req.json();
    const { title, content, username } = body;

    if (!title || !content || !username) {
      return NextResponse.json(
        { error: "Title, content and username are required" },
        { status: 400 }
      );
    }

    const post = await prisma.board.findUnique({
      where: { id: id },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const updatedPost = await prisma.board.update({
      where: { id: id },
      data: {
        title,
        content,
        username,
      },
    });

    const postData = JSON.parse(JSON.stringify(updatedPost, replacer));
    return NextResponse.json(postData, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: `Error updating post: ${error.message}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE 메서드
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const post = await prisma.board.findUnique({
      where: { id: id },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await prisma.board.delete({
      where: { id: id },
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
