import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface TrendPageProps {
  params: Promise<{ slug: string }>;
}

export default async function TrendPage({ params }: TrendPageProps) {
  const { slug } = await params;
  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c: string) => c.toUpperCase());

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/" className="text-sm text-muted-foreground hover:underline mb-4 inline-block">
        Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground mb-8">
        Trending analysis and real-time insights for {title}.
      </p>
      <Separator className="mb-8" />

      <Card className="mb-6">
        <CardContent className="p-6 text-center">
          <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/50">
            <p className="text-muted-foreground">Trend Volume Chart (Coming Soon)</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Trend Trajectory</h3>
            <p className="text-sm text-muted-foreground">Historical data and forecast analysis.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Related Topics</h3>
            <p className="text-sm text-muted-foreground">Connected trends and cross-references.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Geographic Breakdown</h3>
            <p className="text-sm text-muted-foreground">Regional interest distribution map.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">News Coverage</h3>
            <p className="text-sm text-muted-foreground">Aggregated news and social media coverage.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
