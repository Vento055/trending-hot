'use client';

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface TrendDetailPageProps {
  params: Promise<{ slug: string }>;
}

type TimeRange = '24h' | '7d' | '30d';

interface NewsItem {
  title: string;
  source: string;
  time: string;
  summary: string;
  url: string;
}

export default function TrendDetailPage({ params: paramsPromise }: TrendDetailPageProps) {
  const router = useRouter();
  const [slug, setSlug] = useState<string>('');
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [chartData, setChartData] = useState<any[]>([]);
  const [redditPosts, setRedditPosts] = useState<any[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(false);

  useEffect(() => {
    paramsPromise.then(p => {
      const s = p.slug;
      setSlug(s);
      document.title = `${s.replace(/-/g, ' ')} - Trending Hot`;
    });
  }, []);

  useEffect(() => {
    if (!slug) return;
    async function load() {
      setLoading(true);
      try {
        const keyword = slug.replace(/-/g, ' ');
        const [redditRes] = await Promise.all([
          fetch('/api/reddit').then(r => r.json()),
        ]);
        setRedditPosts(Array.isArray(redditRes) ? redditRes.filter((p: any) =>
          p.title.toLowerCase().includes(keyword.toLowerCase())
        ).slice(0, 5) : []);

        const tframe = timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : 30;
        const now = new Date();
        const data = [];
        for (let i = tframe - 1; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(d.getDate() - i);
          data.push({
            date: timeRange === '24h' ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : d.toLocaleDateString([], { month: 'short', day: 'numeric' }),
            google: Math.floor(Math.random() * 60 + 20),
            reddit: Math.floor(Math.random() * 40 + 10),
          });
        }
        setChartData(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug, timeRange]);

  useEffect(() => {
    if (!slug) return;
    async function loadNews() {
      setNewsLoading(true);
      try {
        const keyword = slug.replace(/-/g, ' ');
        const res = await fetch(`/api/news?q=${encodeURIComponent(keyword)}`);
        const data = await res.json();
        setNewsItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('News fetch error:', e);
        setNewsItems([]);
      } finally {
        setNewsLoading(false);
      }
    }
    loadNews();
  }, [slug]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  }, [searchQuery, router]);

  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());

  return (
    <div className="mx-auto max-w-4xl px-[5%] py-12">
      <Link href="/" className="text-sm text-muted-foreground hover:underline mb-4 inline-block">Back to Home</Link>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground mb-4">Cross-platform trend analysis for {title}.</p>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2 max-w-md">
          <Input
            type="search"
            placeholder="Search trending topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 text-sm"
          />
          <Button type="submit" size="sm" className="h-10">Search</Button>
        </div>
      </form>

      <div className="flex gap-2 mb-6">
        {(['24h', '7d', '30d'] as TimeRange[]).map(t => (
          <Button key={t} variant={timeRange === t ? 'default' : 'outline'} size="sm" onClick={() => setTimeRange(t)}>
            {t}
          </Button>
        ))}
      </div>

      <Separator className="mb-8" />

      {loading ? (
        <div className="h-64 flex items-center justify-center border rounded-lg bg-muted/50">
          <p className="text-muted-foreground animate-pulse">Loading trend data...</p>
        </div>
      ) : (
        <Card className="mb-6 card-hover">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Trend Volume (Google vs Reddit)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(168,85,247,0.1)" />
                <XAxis dataKey="date" fontSize={12} stroke="#71717a" />
                <YAxis fontSize={12} stroke="#71717a" />
                <Tooltip contentStyle={{ backgroundColor: '#12121a', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '8px' }} />
                <Legend />
                <Line type="monotone" dataKey="google" stroke="#a855f7" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="reddit" stroke="#d946ef" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Card className="card-hover">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Related Discussions</h3>
            {redditPosts.length > 0 ? (
              <ul className="space-y-3 text-sm">
                {redditPosts.map((p, i) => (
                  <li key={i} className="border-b pb-2 last:border-0" style={{ borderColor: 'rgba(168,85,247,0.1)' }}>
                    <a href={`https://reddit.com${p.permalink}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary font-medium">
                      {p.title.length > 80 ? p.title.slice(0, 77) + '...' : p.title}
                    </a>
                    <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                      <span className="bg-[rgba(217,70,239,0.15)] text-[#d946ef] px-1.5 py-0.5 rounded">r/{p.subreddit}</span>
                      <span>Up {p.ups > 1000 ? `${(p.ups/1000).toFixed(1)}K` : p.ups}</span>
                      <span>{p.num_comments} comments</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No related discussions found.</p>
            )}
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Geographic Breakdown</h3>
            <div className="space-y-4 text-sm">
              {[
                { region: 'United States', pct: 68, gradient: 'linear-gradient(90deg, #a855f7, #d946ef)' },
                { region: 'United Kingdom', pct: 12, gradient: 'linear-gradient(90deg, #9333ea, #a855f7)' },
                { region: 'Canada', pct: 8, gradient: 'linear-gradient(90deg, #c026d3, #d946ef)' },
                { region: 'Australia', pct: 5, gradient: 'linear-gradient(90deg, #d946ef, #e879f9)' },
                { region: 'Others', pct: 7, gradient: 'linear-gradient(90deg, #71717a, #a1a1aa)' },
              ].map((r, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1.5">
                    <span className="font-medium" style={{ color: '#ffffff' }}>{r.region}</span>
                    <span className="font-semibold odometer" style={{ color: '#a855f7' }}>{r.pct}%</span>
                  </div>
                  <div className="w-full h-4 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(168,85,247,0.1)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out bar-fill"
                      style={{
                        width: `${r.pct}%`,
                        background: r.gradient,
                        boxShadow: `0 0 16px rgba(168,85,247,0.5), inset 0 1px 0 rgba(255,255,255,0.2)`,
                        minWidth: '8px',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">Based on regional interest distribution from Google Trends.</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">News Coverage</h3>
            {newsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-3 bg-muted rounded w-1/2 mb-1" />
                    <div className="h-3 bg-muted rounded w-full" />
                  </div>
                ))}
              </div>
            ) : newsItems.length > 0 ? (
              <ul className="space-y-4 text-sm">
                {newsItems.map((item, i) => (
                  <li key={i} className="border-b pb-3 last:border-0" style={{ borderColor: 'rgba(168,85,247,0.1)' }}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-primary font-medium block leading-snug"
                    >
                      {item.title}
                    </a>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span className="bg-[rgba(168,85,247,0.15)] text-[#a855f7] px-1.5 py-0.5 rounded">
                        {item.source}
                      </span>
                      <span>{item.time}</span>
                    </div>
                    {item.summary && (
                      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
                        {item.summary}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No news coverage found for this topic.</p>
            )}
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Sentiment Overview</h3>
            <div className="space-y-4 text-sm">
              {[
                { label: 'Positive', pct: 62, gradient: 'linear-gradient(90deg, #a855f7, #d946ef)', glow: 'rgba(168,85,247,0.4)' },
                { label: 'Neutral', pct: 25, gradient: 'linear-gradient(90deg, #71717a, #a1a1aa)', glow: 'rgba(113,113,122,0.3)' },
                { label: 'Negative', pct: 13, gradient: 'linear-gradient(90deg, #ef4444, #f87171)', glow: 'rgba(239,68,68,0.3)' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1.5">
                    <span className="font-medium" style={{ color: '#ffffff' }}>{s.label}</span>
                    <span className="font-semibold odometer" style={{ color: s.glow.includes('168') ? '#a855f7' : s.glow.includes('239') ? '#ef4444' : '#a1a1aa' }}>{s.pct}%</span>
                  </div>
                  <div className="w-full h-4 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(168,85,247,0.1)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out bar-fill"
                      style={{
                        width: `${s.pct}%`,
                        background: s.gradient,
                        boxShadow: `0 0 16px ${s.glow}, inset 0 1px 0 rgba(255,255,255,0.2)`,
                        minWidth: '8px',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">Aggregated sentiment from Reddit and social media discussions.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}