import { NextResponse } from "next/server";

interface RedditPost {
  title: string;
  subreddit: string;
  ups: number;
  num_comments: number;
  permalink: string;
  url: string;
}

let cache: { data: RedditPost[] | null; ts: number } = { data: null, ts: 0 };
const TTL = 5 * 60 * 1000;

async function fetchReddit(endpoint: string): Promise<RedditPost[]> {
  const res = await fetch(`https://www.reddit.com${endpoint}`, {
    headers: { "User-Agent": "trending-hot/1.0" },
  });
  const json = await res.json();
  return json.data.children.map((c: any) => ({
    title: c.data.title,
    subreddit: c.data.subreddit,
    ups: c.data.ups,
    num_comments: c.data.num_comments,
    permalink: c.data.permalink,
    url: c.data.url,
  }));
}

export async function GET() {
  if (cache.data && Date.now() - cache.ts < TTL) {
    return NextResponse.json(cache.data, { headers: { "x-cache": "HIT" } });
  }

  try {
    const [hot, popular] = await Promise.all([
      fetchReddit("/r/all/hot.json?limit=25"),
      fetchReddit("/r/popular/hot.json?limit=25"),
    ]);
    const merged = [...hot, ...popular].sort((a, b) => b.ups - a.ups).slice(0, 20);
    cache = { data: merged, ts: Date.now() };
    return NextResponse.json(merged, { headers: { "x-cache": "MISS" } });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
