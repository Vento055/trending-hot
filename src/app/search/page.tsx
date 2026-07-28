"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ============================================================
// Types
// ============================================================

interface SearchResult {
  id: string;
  title: string;
  source: "google" | "reddit";
  metric: string;
  metricLabel: string;
  direction: "up" | "down" | "new";
  slug: string;
  score: number;
}

interface RegionDistribution {
  region: string;
  percentage: number;
}

interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
}

interface TrendDataPoint {
  date: string;
  google: number;
  reddit: number;
}

interface SearchResponse {
  query: string;
  total: number;
  results: SearchResult[];
  redditResults: SearchResult[];
  region: RegionDistribution[];
  sentiment: SentimentData;
  trendData: TrendDataPoint[];
}

function directionIcon(d: string) {
  if (d === "up") return "\u2191";
  if (d === "down") return "\u2193";
  return "\u2726";
}

// ============================================================
// Inner component (uses useSearchParams)
// ============================================================

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [inputValue, setInputValue] = useState(initialQuery);
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const doSearch = useCallback(
    async (q: string) => {
      if (!q.trim()) {
        setData(null);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`);
        const json: SearchResponse = await res.json();
        setData(json);
      } catch (e) {
        console.error("Search failed:", e);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setInputValue(initialQuery);
      doSearch(initialQuery);
    }
  }, [initialQuery, doSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    router.replace(`/search?q=${encodeURIComponent(trimmed)}`);
    doSearch(trimmed);
  };

  const maxRegionPct = data?.region.length
    ? Math.max(...data.region.map((r) => r.percentage))
    : 100;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Search bar */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2 max-w-xl mx-auto">
          <Input
            type="search"
            placeholder="Search trending topics..."
            className="h-12 text-base flex-1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button type="submit" size="lg" className="h-12 px-6">
            Search
          </Button>
        </div>
      </form>

      {/* Loading */}
      {loading && (
        <div className="text-center py-16">
          <p className="text-muted-foreground animate-pulse">Searching...</p>
        </div>
      )}

      {/* Empty query */}
      {!loading && !data && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">Enter a keyword to search trending topics.</p>
        </div>
      )}

      {/* Results */}
      {!loading && data && (
        <>
          {/* Result count */}
          <p className="text-sm text-muted-foreground mb-6">
            {data.total > 0
              ? `${data.total} result${data.total !== 1 ? "s" : ""} for "${data.query}"`
              : `No results found for "${data.query}"`}
          </p>

          {data.total === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">Try a different keyword.</p>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Left column: results */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="font-semibold text-lg">Matched Topics</h2>
                {data.results.map((item) => (
                  <Link key={item.id} href={`/trend/${item.slug}`}>
                    <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              item.source === "google"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                                : "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                            }`}
                          >
                            {item.source === "google" ? "Google" : "Reddit"}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground">
                              Score: {item.score}
                            </span>
                            <span
                              className={`text-sm font-mono ${
                                item.direction === "up"
                                  ? "text-green-500"
                                  : item.direction === "down"
                                  ? "text-red-500"
                                  : "text-blue-500"
                              }`}
                            >
                              {directionIcon(item.direction)} {item.metric}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-sm leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.metricLabel}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Right column: analytics */}
              <div className="space-y-6">
                {/* 24h Trend Chart */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-4">
                      24h Trend (Google vs Reddit)
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={data.trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          fontSize={10}
                          interval={5}
                        />
                        <YAxis fontSize={10} />
                        <Tooltip />
                        <Legend wrapperStyle={{ fontSize: 11 }} />
                        <Line
                          type="monotone"
                          dataKey="google"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={false}
                          name="Google"
                        />
                        <Line
                          type="monotone"
                          dataKey="reddit"
                          stroke="#f97316"
                          strokeWidth={2}
                          dot={false}
                          name="Reddit"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Region Distribution */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-4">
                      Region Distribution
                    </h3>
                    <div className="space-y-2">
                      {data.region.map((r) => (
                        <div key={r.region}>
                          <div className="flex justify-between text-xs mb-0.5">
                            <span className="text-muted-foreground">
                              {r.region}
                            </span>
                            <span className="font-mono">{r.percentage}%</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-2 bg-primary rounded-full transition-all"
                              style={{
                                width: `${(r.percentage / maxRegionPct) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Sentiment Overview */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-4">
                      Sentiment Overview
                    </h3>
                    <div className="space-y-3">
                      {/* Positive */}
                      <div>
                        <div className="flex justify-between text-xs mb-0.5">
                          <span className="text-muted-foreground">Positive</span>
                          <span className="text-green-500 font-mono">
                            {data.sentiment.positive}%
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-2.5 bg-green-500 rounded-full transition-all"
                            style={{ width: `${data.sentiment.positive}%` }}
                          />
                        </div>
                      </div>

                      {/* Neutral */}
                      <div>
                        <div className="flex justify-between text-xs mb-0.5">
                          <span className="text-muted-foreground">Neutral</span>
                          <span className="text-yellow-500 font-mono">
                            {data.sentiment.neutral}%
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-2.5 bg-yellow-500 rounded-full transition-all"
                            style={{ width: `${data.sentiment.neutral}%` }}
                          />
                        </div>
                      </div>

                      {/* Negative */}
                      <div>
                        <div className="flex justify-between text-xs mb-0.5">
                          <span className="text-muted-foreground">Negative</span>
                          <span className="text-red-500 font-mono">
                            {data.sentiment.negative}%
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-2.5 bg-red-500 rounded-full transition-all"
                            style={{ width: `${data.sentiment.negative}%` }}
                          />
                        </div>
                      </div>

                      {/* Combined bar */}
                      <div className="pt-2">
                        <p className="text-xs text-muted-foreground mb-1">
                          Combined
                        </p>
                        <div className="w-full h-4 rounded-full overflow-hidden flex">
                          <div
                            className="h-full bg-green-500 transition-all"
                            style={{ width: `${data.sentiment.positive}%` }}
                          />
                          <div
                            className="h-full bg-yellow-500 transition-all"
                            style={{ width: `${data.sentiment.neutral}%` }}
                          />
                          <div
                            className="h-full bg-red-500 transition-all"
                            style={{ width: `${data.sentiment.negative}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ============================================================
// Page wrapper with Suspense
// ============================================================

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="text-center py-16">
            <p className="text-muted-foreground animate-pulse">Loading...</p>
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
