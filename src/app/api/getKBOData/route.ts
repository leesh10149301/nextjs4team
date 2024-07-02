import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "data",
  "gamedata.json"
);

export async function GET(req: NextRequest) {
  try {
    // gamedata.json 파일을 비동기적으로 읽기
    const data = await fs.promises.readFile(DATA_FILE_PATH, "utf-8");
    const jsonData = JSON.parse(data);

    return NextResponse.json(jsonData);
  } catch (error) {
    console.error("Error reading gamedata.json:", error);
    return NextResponse.json(
      { error: "Failed to read gamedata.json" },
      { status: 500 }
    );
  }
}
