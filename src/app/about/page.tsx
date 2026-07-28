import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Trending Hot",
  description:
    "Learn more about Trending Hot, the real-time internet trends aggregation platform powered by Google Trends and Reddit.",
};

const features = [
  {
    title: "Multi-Source Aggregation",
    desc: "Bring together trending data from Google Trends and Reddit in one unified dashboard. No more switching between platforms.",
  },
  {
    title: "Real-Time Updates",
    desc: "Data refreshes every 5 minutes so you never miss a viral moment. Stay ahead of the curve with the latest trending topics.",
  },
  {
    title: "Trend Analysis",
    desc: "Track topic momentum with directional indicators, traffic metrics, and engagement scores. Understand not just what is trending, but how fast it is rising.",
  },
  {
    title: "Global Coverage",
    desc: "Access trending data across multiple regions. Whether you are tracking US trends or global conversations, we have you covered.",
  },
  {
    title: "Dark Mode Support",
    desc: "Built with dark mode from the ground up. The interface respects your system preferences and provides a comfortable reading experience at any time of day.",
  },
  {
    title: "Fast and Responsive",
    desc: "Built with Next.js and Tailwind CSS for a lightning-fast experience across desktop, tablet, and mobile devices.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        About Trending Hot
      </h1>
      <div className="space-y-8 text-muted-foreground">
        <section>
          <p className="text-base leading-relaxed">
            Trending Hot is a real-time internet trends aggregation platform
            designed to help you discover what the world is talking about right
            now. By aggregating data from Google Trends and Reddit, we bring
            together the pulse of search interest and the energy of community
            discussions in one place.
          </p>
          <p className="text-base leading-relaxed mt-4">
            Whether you are a content creator looking for the next big story, a
            marketer tracking brand sentiment, or simply a curious mind wanting
            to stay informed, Trending Hot gives you the tools to cut through
            the noise and focus on what matters.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Key Features
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border border-border bg-card p-4"
              >
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Data Sources
          </h2>
          <p className="text-base leading-relaxed">
            We currently pull data from two primary sources:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li className="text-base leading-relaxed">
              <span className="font-medium text-foreground">Google Trends</span>
              {" "}
              &mdash; Daily and real-time search trends showing what people are
              actively searching for across Google.
            </li>
            <li className="text-base leading-relaxed">
              <span className="font-medium text-foreground">Reddit</span>
              {" "}
              &mdash; Hot and rising posts from popular subreddits, giving you
              insight into community-driven conversations.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
