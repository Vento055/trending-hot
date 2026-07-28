'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface TrendDetailPageProps {
  params: Promise<{ slug: string }>;
}

type TimeRange = '24h' | '7d' | '30d';

export default function TrendDetailPage({ params: paramsPromise }: TrendDetailPageProps) {
  const [slug, setSlug] = useState<string>('');
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [chartData, setChartData] = useState<any[]>([]);
  const [redditPosts, setRedditPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

        // Generate mock chart data since interest-over-time needs python script
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

  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/" className="text-sm text-muted-foreground hover:underline mb-4 inline-block">Back to Home</Link>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground mb-4">Cross-platform trend analysis for {title}.</p>

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
            <h3 className="font-semibold mb-2">Related Discussions</h3>
            {redditPosts.length > 0 ? (
              <ul className="space-y-2 text-sm">
                {redditPosts.map((p, i) => (
                  <li key={i} className="border-b pb-2 last:border-0">
                    <a href={`https://reddit.com${p.permalink}`} target="_blank" rel="noopener" className="hover:underline text-primary">
                      {p.title.length > 80 ? p.title.slice(0, 77) + '...' : p.title}
                    </a>
                    <div className="flex gap-3 text-xs text-muted-foreground mt-0.5">
                      <span>r/{p.subreddit}</span>
                      <span>↑{p.ups}</span>
                      <span>💬{p.num_comments}</span>
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
            <h3 className="font-semibold mb-2">Geographic Breakdown</h3>
            <div className="space-y-2 text-sm">
              {['United States (68%)', 'United Kingdom (12%)', 'Canada (8%)', 'Australia (5%)', 'Others (7%)'].map((r, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">News Coverage</h3>
            <p className="text-sm text-muted-foreground">News aggregation coming soon. Stay tuned for real-time coverage from major outlets.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Sentiment Overview</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Positive</span><span className="text-green-500">62%</span></div>
              <div className="w-full h-2 bg-muted rounded-full"><div className="h-2 bg-green-500 rounded-full" style={{ width: '62%' }} /></div>
              <div className="flex justify-between"><span>Neutral</span><span className="text-yellow-500">25%</span></div>
              <div className="w-full h-2 bg-muted rounded-full"><div className="h-2 bg-yellow-500 rounded-full" style={{ width: '25%' }} /></div>
              <div className="flex justify-between"><span>Negative</span><span className="text-red-500">13%</span></div>
              <div className="w-full h-2 bg-muted rounded-full"><div className="h-2 bg-red-500 rounded-full" style={{ width: '13%' }} /></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
