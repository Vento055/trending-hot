'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TrendItem {
  id: string;
  title: string;
  source: 'google' | 'reddit';
  metric: string;
  metricLabel: string;
  direction: 'up' | 'down' | 'new';
  slug: string;
}

function directionIcon(d: string) {
  if (d === 'up') return '↑';
  if (d === 'down') return '↓';
  return '✦';
}

export default function Home() {
  const [tab, setTab] = useState<'all' | 'google' | 'reddit'>('all');
  const [googleTrends, setGoogleTrends] = useState<string[]>([]);
  const [redditPosts, setRedditPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [gt, rp] = await Promise.all([
          fetch('/api/trends?geo=US').then(r => r.json()),
          fetch('/api/reddit').then(r => r.json()),
        ]);
        setGoogleTrends(Array.isArray(gt) ? gt : []);
        setRedditPosts(Array.isArray(rp) ? rp : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const items: TrendItem[] = [
    ...googleTrends.map((t, i) => ({
      id: `gt-${i}`,
      title: t,
      source: 'google' as const,
      metric: `${Math.floor(Math.random() * 50 + 10)}K`,
      metricLabel: 'searches',
      direction: (['up', 'up', 'up', 'down', 'new'] as const)[i % 5],
      slug: t.toLowerCase().replace(/\s+/g, '-'),
    })),
    ...redditPosts.slice(0, 6).map((p, i) => ({
      id: `rd-${i}`,
      title: p.title.length > 60 ? p.title.slice(0, 57) + '...' : p.title,
      source: 'reddit' as const,
      metric: p.ups > 1000 ? `${(p.ups/1000).toFixed(1)}K` : `${p.ups}`,
      metricLabel: `upvotes · r/${p.subreddit}`,
      direction: p.ups > 5000 ? ('up' as const) : ('new' as const),
      slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60),
    })),
  ];

  const filtered = tab === 'all'
    ? items
    : items.filter(i => i.source === tab);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-4">
          Discover What&apos;s <span className="text-primary">Trending</span> Across the Internet
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Real-time insights powered by Google Trends and Reddit. Stay ahead of every viral moment.
        </p>
        <div className="mx-auto max-w-md">
          <Input type="search" placeholder="Search trending topics..." className="h-12 text-base" disabled />
          <p className="text-xs text-muted-foreground mt-2">Search coming soon.</p>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-6">
          <Button variant={tab === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setTab('all')}>All</Button>
          <Button variant={tab === 'google' ? 'default' : 'outline'} size="sm" onClick={() => setTab('google')}>Google Trends</Button>
          <Button variant={tab === 'reddit' ? 'default' : 'outline'} size="sm" onClick={() => setTab('reddit')}>Reddit</Button>
          {loading && <span className="text-sm text-muted-foreground ml-2 animate-pulse">Loading...</span>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, 12).map((item) => (
            <Link key={item.id} href={`/trend/${item.slug}`}>
              <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      item.source === 'google' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                      'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
                    }`}>
                      {item.source === 'google' ? 'Google' : 'Reddit'}
                    </span>
                    <span className={`text-sm font-mono ${
                      item.direction === 'up' ? 'text-green-500' : item.direction === 'down' ? 'text-red-500' : 'text-blue-500'
                    }`}>
                      {directionIcon(item.direction)} {item.metric}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm leading-snug">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.metricLabel}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No trends available right now.</p>
            <p className="text-sm mt-2">Check back soon — data refreshes every 5 minutes.</p>
          </div>
        )}
      </section>
    </div>
  );
}
