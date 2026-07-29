import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const articlesDir = path.join(process.cwd(), "data", "articles");
  const filePath = path.join(articlesDir, `${slug}.json`);

  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const article = JSON.parse(raw);
      return NextResponse.json(article, {
        headers: { "x-source": "generated" },
      });
    }
  } catch (e) {
    console.error(`Error reading article ${slug}:`, e);
  }

  return NextResponse.json(
    { error: "Article not found" },
    { status: 404, headers: { "x-source": "not-found" } }
  );
}