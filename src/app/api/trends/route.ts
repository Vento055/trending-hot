import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

let cache: { data: string[] | null; ts: number } = { data: null, ts: 0 };
const TTL = 5 * 60 * 1000;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const geo = searchParams.get("geo") || "US";
  const t = searchParams.get("t") || "7d";

  const key = `daily:${geo}`;
  if (cache.data && Date.now() - cache.ts < TTL) {
    return NextResponse.json(cache.data, { headers: { "x-cache": "HIT" } });
  }

  const result = await new Promise<string[]>((resolve, reject) => {
    const script = path.join(process.cwd(), "scripts", "trends.py");
    const py = spawn("python", [script, "daily", geo]);
    let out = "", err = "";
    py.stdout.on("data", (d: Buffer) => out += d.toString());
    py.stderr.on("data", (d: Buffer) => err += d.toString());
    py.on("close", (code) => {
      if (code === 0) {
        try { resolve(JSON.parse(out)); } catch { reject(err || "parse error"); }
      } else {
        reject(err || `exit ${code}`);
      }
    });
  });

  cache = { data: result, ts: Date.now() };
  return NextResponse.json(result, { headers: { "x-cache": "MISS" } });
}
