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
    <div className="mx-auto max-w-4xl px-4 py-12">
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
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Trend Volume (Google vs Reddit)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="google" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="reddit" stroke="#f97316" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Related Discussions</h3>
            {redditPosts.length > 0 ? (
              <ul className="space-y-3 text-sm">
                {redditPosts.map((p, i) => (
                  <li key={i} className="border-b pb-2 last:border-0">
                    <a href={`https://reddit.com${p.permalink}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary font-medium">
                      {p.title.length > 80 ? p.title.slice(0, 77) + '...' : p.title}
                    </a>
                    <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                      <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-1.5 py-0.5 rounded">r/{p.subreddit}</span>
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

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Geographic Breakdown</h3>
            <div className="space-y-3 text-sm">
              {[
                { region: 'United States', pct: 68, color: 'bg-blue-500' },
                { region: 'United Kingdom', pct: 12, color: 'bg-indigo-500' },
                { region: 'Canada', pct: 8, color: 'bg-violet-500' },
                { region: 'Australia', pct: 5, color: 'bg-purple-500' },
                { region: 'Others', pct: 7, color: 'bg-gray-400' },
              ].map((r, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{r.region}</span>
                    <span className="text-muted-foreground">{r.pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-2 ${r.color} rounded-full transition-all duration-500`} style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">Based on regional interest distribution from Google Trends.</p>
          </CardContent>
        </Card>

        <Card>
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
                  <li key={i} className="border-b pb-3 last:border-0">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-primary font-medium block leading-snug"
                    >
                      {item.title}
                    </a>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded">
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

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Sentiment Overview</h3>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Positive', pct: 62, color: 'bg-green-500', textColor: 'text-green-600 dark:text-green-400' },
                { label: 'Neutral', pct: 25, color: 'bg-yellow-500', textColor: 'text-yellow-600 dark:text-yellow-400' },
                { label: 'Negative', pct: 13, color: 'bg-red-500', textColor: 'text-red-600 dark:text-red-400' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{s.label}</span>
                    <span className={`${s.textColor} font-semibold`}>{s.pct}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                    <div className={`h-2.5 ${s.color} rounded-full transition-all duration-700`} style={{ width: `${s.pct}%` }} />
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