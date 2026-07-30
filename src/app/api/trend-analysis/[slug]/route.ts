import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const TREND_ANALYSIS_DIR = path.join(process.cwd(), "data", "trend-analysis");

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const filePath = path.join(TREND_ANALYSIS_DIR, `${slug}.json`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "Trend analysis not found" },
        { status: 404 }
      );
    }

    const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return NextResponse.json(content, { headers: { "x-cache": "MISS" } });
  } catch (e: any) {
    console.error("Trend analysis (slug) fetch failed:", e.message);
    return NextResponse.json(
      { error: "Failed to fetch trend analysis" },
      { status: 500 }
    );
  }
}
