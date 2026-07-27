import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-4">
          Discover What&apos;s <span className="text-primary">Trending</span> Across the Internet
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Real-time insights into what people are talking about, why it matters, and the forces behind every viral moment.
        </p>
        <div className="mx-auto max-w-md">
          <Input
            type="search"
            placeholder="Search trending topics..."
            className="h-12 text-base"
            disabled
          />
          <p className="text-xs text-muted-foreground mt-2">Search coming soon. Stay tuned!</p>
        </div>
      </section>

      {/* Placeholder trending cards */}
      <section>
        <h2 className="text-2xl font-bold mb-6">🔥 Trending Now</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["AI Agents", "Next.js 16", "WebGPU", "Edge Computing", "Rust in 2026", "Quantum AI"].map((topic, i) => (
            <Link key={i} href={`/trend/${topic.toLowerCase().replace(/\s+/g, "-")}`}>
              <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">#{i + 1} Trending</span>
                    <span className="text-xs text-green-500">+12k</span>
                  </div>
                  <h3 className="font-semibold">{topic}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Discover why {topic} is capturing attention right now.
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
