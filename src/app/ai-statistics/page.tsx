import type { Metadata } from "next";
import { StatisticsTemplate } from "@/components/listing/templates/StatisticsTemplate";
import type {
  StatisticsData,
  StatSubTopic,
  FAQItem,
  RelatedListing,
  TOCItem,
  AuthorMeta,
} from "@/lib/listing/types";

const AUTHOR: AuthorMeta = {
  name: "Trending Hot Team",
  role: "Data & Research Editorial",
  date: "2026-07-31",
  readTime: "11 min read",
};

const subTopics: StatSubTopic[] = [
  {
    title: "Market Size & Growth",
    dataPoints: [
      {
        value: "$1.85T",
        label: "Global AI market size in 2026",
        source: "Grand View Research, 2026 estimate",
      },
      {
        value: "36.6%",
        label: "Projected CAGR (2025-2030)",
        source: "Fortune Business Insights, 2026",
      },
      {
        value: "$9.5T",
        label: "Forecasted annual economic impact by 2030",
        source: "McKinsey Global Institute projection",
      },
    ],
    insight:
      "The generative AI sub-segment alone now accounts for roughly a quarter of total AI market value, growing several times faster than the broader category as enterprise spending pivots from experimentation to deployment.",
  },
  {
    title: "Adoption & Usage",
    dataPoints: [
      {
        value: "78%",
        label: "Organizations using AI in at least one business function",
        source: "McKinsey State of AI Survey, 2026",
      },
      {
        value: "1.4B",
        label: "Weekly active users of leading consumer AI assistants",
        source: "Aggregated platform disclosures, Q2 2026",
      },
      {
        value: "3.8T",
        label: "AI-generated tokens processed monthly across major APIs",
        source: "Public API usage reports, 2026",
      },
      {
        value: "62%",
        label: "Knowledge workers using AI tools weekly at work",
        source: "Microsoft Work Trend Index, 2026",
      },
    ],
    insight:
      "Adoption has crossed the chasm from early adopters to the early majority, with weekly workplace usage now the norm for the majority of knowledge workers rather than the exception.",
  },
  {
    title: "Investment & Funding",
    dataPoints: [
      {
        value: "$456B",
        label: "Total AI venture funding in 2025",
        source: "PitchBook, Annual Report 2025",
      },
      {
        value: "$310B",
        label: "Cumulative US hyperscaler AI infrastructure commitments",
        source: "Company earnings disclosures, 2026",
      },
      {
        value: "4,200+",
        label: "Newly funded AI startups in 2025",
        source: "Crunchbase, 2026",
      },
    ],
    insight:
      "Capital is concentrating into a small number of foundation-model companies, while application-layer funding is increasingly gated by distribution and retention rather than model novelty alone.",
  },
  {
    title: "Workforce & Economic Impact",
    dataPoints: [
      {
        value: "230M",
        label: "Jobs globally expected to be reshaped by AI by 2030",
        source: "World Economic Forum Future of Jobs Report, 2026",
      },
      {
        value: "+40%",
        label: "Productivity lift for knowledge workers using AI tools",
        source: "Harvard Business School / BCG field study, 2025",
      },
      {
        value: "97M",
        label: "New roles projected to be created by AI by 2030",
        source: "WEF Future of Jobs Report, 2026",
      },
    ],
    insight:
      "Net employment forecasts have improved compared to prior years, with reskilling rather than headcount reduction emerging as the dominant short-term workforce response.",
  },
];

const aiToc: TOCItem[] = [
  { id: "introduction", title: "Introduction", level: 1 },
  { id: "market-size-growth", title: "Market Size & Growth", level: 1 },
  { id: "adoption-usage", title: "Adoption & Usage", level: 1 },
  { id: "investment-funding", title: "Investment & Funding", level: 1 },
  { id: "workforce-economic-impact", title: "Workforce & Economic Impact", level: 1 },
  { id: "methodology", title: "Methodology", level: 1 },
  { id: "faq", title: "FAQ", level: 1 },
  { id: "related", title: "Related Rankings", level: 1 },
];

const aiTldr: string[] = [
  "The global AI market is valued at $1.85T in 2026 and is projected to grow at a 36.6% CAGR through 2030.",
  "78% of organizations now use AI in at least one business function, and 62% of knowledge workers use AI tools weekly.",
  "AI venture funding reached $456B in 2025, with hyperscalers committing a further $310B to infrastructure.",
  "AI is expected to reshape 230M jobs by 2030 while creating 97M new roles, with a 40% productivity lift for knowledge workers.",
  "Generative AI is the fastest-growing sub-segment and now accounts for roughly a quarter of total AI market value.",
];

const aiFaqs: FAQItem[] = [
  {
    question: "How big is the AI market in 2026?",
    answer:
      "The global artificial intelligence market is valued at approximately $1.85 trillion in 2026, according to Grand View Research estimates, and is projected to grow at a compound annual growth rate of 36.6% through 2030. Generative AI is the fastest-growing sub-segment, accounting for roughly a quarter of total market value.",
  },
  {
    question: "What percentage of companies use AI?",
    answer:
      "As of 2026, 78% of organizations report using AI in at least one business function, according to the McKinsey State of AI Survey. Among knowledge workers specifically, 62% use AI tools on a weekly basis at work, according to the Microsoft Work Trend Index 2026.",
  },
  {
    question: "How much is being invested in AI?",
    answer:
      "Total AI venture funding reached approximately $456 billion in 2025 according to PitchBook. In addition, major US hyperscalers have disclosed cumulative commitments of around $310 billion toward AI infrastructure. Over 4,200 new AI startups received funding in 2025 alone.",
  },
  {
    question: "Will AI replace jobs?",
    answer:
      "Forecasts have moderated over time. The World Economic Forum projects AI will reshape 230 million jobs globally by 2030 while creating 97 million new roles. Short-term employer responses are favoring reskilling and productivity augmentation (a roughly 40% productivity lift for knowledge workers) over broad headcount reductions, according to recent field studies.",
  },
  {
    question: "How were these AI statistics sourced?",
    answer:
      "Statistics are compiled from a mix of market research firms (Grand View Research, Fortune Business Insights), consultancies (McKinsey, BCG, WEF), financial data providers (PitchBook, Crunchbase), and public company disclosures. Figures are point-in-time estimates for 2026 and should be treated as directional rather than precise, given how quickly the AI landscape evolves.",
  },
];

const aiRelated: RelatedListing[] = [
  {
    title: "Trending Beauty Products 2026",
    href: "/trending-beauty-products",
    description:
      "The 8 fastest-growing beauty product trends in 2026, ranked by growth rate.",
  },
  {
    title: "Most Visited Websites in Japan",
    href: "/listings/most-visited-websites-in-japan",
    description:
      "Japan's 50 most visited websites, led by Yahoo Japan, Google, and Amazon.",
  },
  {
    title: "Top AI Startups 2026",
    href: "/listings/top-ai-startups-2026",
    description:
      "A brand-level ranking of the leading AI startups by funding and growth.",
  },
];

const aiData: StatisticsData = {
  type: "B",
  industry: "Artificial Intelligence",
  year: "2026",
  subTopics,
  methodology:
    "These statistics are compiled from a range of public and licensed sources, including market research firms (Grand View Research, Fortune Business Insights), consultancies (McKinsey, BCG, the World Economic Forum), financial data providers (PitchBook, Crunchbase), aggregated platform disclosures, and peer-reviewed field studies. Where ranges or conflicting estimates existed, the most recent and most frequently cited figure was used. All figures are point-in-time estimates for 2026 and should be treated as directional rather than precise, as the AI landscape evolves rapidly. Growth rates and forecasts are subject to revision as new data becomes available.",
  faqs: aiFaqs,
  related: aiRelated,
  tldr: aiTldr,
  toc: aiToc,
  author: AUTHOR,
  introduction:
    "Artificial intelligence moved from breakout technology to economic infrastructure in 2026. This statistics hub consolidates the most important, frequently cited figures on the AI industry, organized into four themes: market size and growth, adoption and usage, investment and funding, and workforce and economic impact. Each data point includes its source so you can trace provenance, and each chapter closes with an editorial insight on what the numbers mean in context. Use this as a reference dashboard for the state of AI in 2026.",
};

export const metadata: Metadata = {
  title: "AI Statistics 2026: Market Size, Adoption, Funding & Workforce",
  description:
    "The most important artificial intelligence statistics for 2026, covering market size, adoption, investment, and workforce impact, with sourced data points and editorial insights.",
  metadataBase: new URL("https://trending-hot.com"),
  alternates: {
    canonical: "/ai-statistics",
  },
  openGraph: {
    title: "AI Statistics 2026: Market Size, Adoption, Funding & Workforce | Trending Hot",
    description:
      "The most important artificial intelligence statistics for 2026, organized by theme and sourced from public data.",
    url: "https://trending-hot.com/ai-statistics",
    siteName: "Trending Hot",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Statistics 2026: Market Size, Adoption, Funding & Workforce | Trending Hot",
    description:
      "The most important artificial intelligence statistics for 2026, organized by theme and sourced from public data.",
  },
};

export default function AiStatisticsPage() {
  return <StatisticsTemplate data={aiData} />;
}
