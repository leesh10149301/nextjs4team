import supabase from "@/app/utils/supabase/client";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

function replacer(key, value) {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
}

// supabase에서 username 가져오기
export async function getUsernameFromToken(req: NextRequest) {
  const token = req.headers.get("Authorization")?.replace("Bearer", "").trim();
  if (!token) throw new Error("Authentication token is missing");

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);
  if (error) throw new Error("Failed to get user from supabase");

  const { data: userinfo, error: userinfoError } = await supabase
    .from("userinfo")
    .select("username")
    .eq("id", user.id)
    .single();

  if (userinfoError) throw new Error("Failed to get user info from supabase");

  return userinfo.username;
}

// POST 메서드
export async function POST(req: NextRequest) {
  try {
    const { title, content } = await req.json();
    const username = await getUsernameFromToken(req);

    const post = await prisma.board.create({
      data: {
        title,
        content,
        username,
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

// GET 메서드
export async function GET() {
  try {
    const posts = await prisma.board.findMany();
    console.log("Fetched posts:", posts); // 콘솔 로그 추가
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


// PUT 메서드
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
      where: { id: id }, // 문자열로 제공
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

// DELETE 메서드
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.board.delete({
      where: { id: id }, // 문자열로 제공
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
